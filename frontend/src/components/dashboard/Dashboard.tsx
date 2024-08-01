import { getStation } from "@/apis/Stations";

import useStations from "@/store/useStationsStore";
import { useEffect } from "react";
import { Button } from "../ui/button";

const Stations = () => {
  const setStations = useStations((state) => state.setStations);
  const stations = useStations((state) => state.stations);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stationData = await getStation();
        if (stationData != undefined) {
          setStations(stationData.data);
        } // Update store with fetched data
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    fetchData(); // Call the function on component mount
  }, []);
  return (
    <div>
      {stations.map((station, index) => (
        <>
          <Button key={index}>{station.name}</Button>
        </>
      ))}
    </div>
  );
};

export default Stations;
