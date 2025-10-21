import { useEffect, useState } from "react";
import "./App.css";
import { MapContainer, TileLayer, Marker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { divIcon, point, icon } from "leaflet";
import LocationMarker from "./LocationMarker";
import Modal from "./Modal";
import MoreModel from "./components/MoreModel";
import { addData, deleteApi, getData, updateData } from "./api/allApi";

function Map() {
  const [open, setOpen] = useState(null);
  const [clickedLatLng, setClickedLatLng] = useState({
    LatLong: [],
    heading: "",
    discription: "",
  });

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [position, setPosition] = useState([]);

  useEffect(() => {
    getData().then((res) => {
      setPosition(res);
    });
  }, []);

  const customIcon = icon({
    iconUrl: "/map-pin.png",
    iconSize: [38, 38],
  });

  const createCustomClusterIcon = (cluster) =>
    divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-cluster-icon",
      iconSize: point(50, 50, true),
    });

  const onSubmit = async () => {
    if (!clickedLatLng.heading || !clickedLatLng.discription) {
      alert("Enter both fields");
      return;
    }

    try {
      const savedMarker = await addData(clickedLatLng);
      setPosition((prev) => [...prev, savedMarker]);
      setOpen(false);
      setClickedLatLng({ LatLong: [], heading: "", discription: "" });
    } catch (error) {
      console.error("Failed to save marker:", error);
    }
  };

  const updateMarker = async (id, newLatLng) => {
    setPosition((prev) =>
      prev.map((marker) =>
        marker.id === id
          ? { ...marker, LatLong: [newLatLng.lat, newLatLng.lng] }
          : marker
      )
    );
    const markerToUpdate = position.find((m) => m.id === id);
    await updateData(id, {
      ...markerToUpdate,
      LatLong: [newLatLng.lat, newLatLng.lng],
    });
  };

  return (
    <>
      <MapContainer
        center={[10.1632, 76.6413]}
        zoom={8}
        scrollWheelZoom={true}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
          OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MarkerClusterGroup iconCreateFunction={createCustomClusterIcon}>
          {position?.map((mark, idx) => (
            <Marker
              key={idx}
              position={mark.LatLong}
              icon={customIcon}
              draggable
              eventHandlers={{
                dragend: (e) => {
                  const newLatLng = e.target.getLatLng();
                  updateMarker(mark.id, newLatLng);
                },
              }}
            >
              <Tooltip
                permanent
                direction="top"
                offset={[0, -10]}
                opacity={1}
                interactive={true}
                className="custom-tooltip"
              >
                <div className="bg-[#252d34] relative w-24 p-2 border rounded-md h-21  shadow-lg text-[#ffffff]">
                  <button
                    onClick={async (e) => {
                      e.stopPropagation();
                      setPosition((prev) =>
                        prev.filter((m) => m.id !== mark.id)
                      );
                      await deleteApi(mark.id);
                    }}
                    className="bg-[url('/delete.png')] w-[13px] h-4 absolute cursor-pointer bg-contain bg-center bg-no-repeat rounded-[2px] right-1 top-1  px-1 py-[2px]"
                  >
                    
                  </button>
                  <span className="block border-t border-b p-1 mt-5 mb-2 w-full overflow-hidden text-ellipsis">
                    {mark.heading}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMarker(mark);
                    }}
                    className="bg-[#00b894] cursor-pointer absolute bottom-1 rounded-[2px]  btn right-1  text-[11px]  w-[90%] m-auto  font-medium"
                  >
                    expand
                  </button>
                </div>
              </Tooltip>
            </Marker>
          ))}
        </MarkerClusterGroup>

        <LocationMarker
          onClick={(latlng) => {
            setClickedLatLng((prev) => ({
              ...prev,
              LatLong: [latlng.lat, latlng.lng],
            }));
            setOpen(true);
          }}
        />
      </MapContainer>

      <Modal open={open} onClose={() => setOpen(false)}>
        <h2 className="text-xl font-semibold text-gray-800 mb-2  text-center  underline">
          Your Memory On This place
        </h2>

        {clickedLatLng && (
          <>
            <div className="flex flex-col gap-3">
              <label htmlFor="head" id="head">
                {" "}
                Heading
              </label>
              <input
                type="text"
                value={clickedLatLng.heading}
                onChange={(e) => {
                  setClickedLatLng((prev) => ({
                    ...prev,
                    heading: e.target.value,
                  }));
                }}
                className="border rounded h-10"
              />
              <label htmlFor="mem"> Discribe</label>
              <textarea
                className="border h-25"
                name="mem"
                value={clickedLatLng.discription}
                onChange={(e) => {
                  setClickedLatLng((prev) => ({
                    ...prev,
                    discription: e.target.value,
                  }));
                }}
                id="mem"
              ></textarea>
            </div>
          </>
        )}

        <button
          onClick={onSubmit}
          className="mt-4 bg-[#00b894] hover:bg-[#0ca98a] text-white px-4 py-2 rounded-lg hover:red-blue-700   "
        >
          Add Marker
        </button>
      </Modal>
      {selectedMarker && (
        <MoreModel
          data={selectedMarker}
          onClose={() => setSelectedMarker(null)}
          onSave={async (updatedData) => {
            setPosition((prev) =>
              prev.map((marker) =>
                marker.id === updatedData.id ? updatedData : marker
              )
            );
            await updateData(updatedData.id, updatedData);
            setSelectedMarker(updatedData);
          }}
        />
      )}
    </>
  );
}

export default Map;
