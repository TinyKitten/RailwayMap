"use client";
import { Station } from "@/gen/proto/stationapi_pb";
import { useFetchRoute } from "@/hooks/useFetchRoute";
import { LayersList, MapView, MapViewState, PickingInfo } from "@deck.gl/core";
import { ScatterplotLayer } from "@deck.gl/layers";
import DeckGL from "@deck.gl/react";
import "maplibre-gl/dist/maplibre-gl.css";
import { useCallback, useState } from "react";
import { Map } from "react-map-gl/maplibre";

export const RouteMap = () => {
  const { stations } = useFetchRoute(
    1130101, // 東京駅
    1131112 // 高尾駅
  );

  const [viewStates, setViewStates] = useState<{
    main: MapViewState;
  }>({
    main: {
      longitude: 139.766084,
      latitude: 35.681382,
      pitch: 0,
      zoom: 12,
    },
  });

  const layers: LayersList = [
    new ScatterplotLayer<Station>({
      id: "stations",
      data: stations,
      stroked: true,
      filled: true,
      pickable: true,
      getPosition: (d: Station) => [d.longitude, d.latitude],
      getRadius: 6,
      radiusUnits: "pixels",
      lineWidthUnits: "pixels",
      getLineWidth: 2,
      getFillColor: [200, 200, 200],
      getLineColor: [100, 100, 100],
    }),
  ];

  const handleViewStateChange = useCallback(
    ({ viewId, viewState }: { viewId: string; viewState: MapViewState }) => {
      setViewStates((currentViewStates) => ({
        main: viewState,
      }));
    },
    []
  );

  const getTooltip = useCallback(({ object }: PickingInfo<Station>) => {
    if (!object) {
      return null;
    }

    const nameRoman = `${object.nameRoman} Sta.`;
    const coordinates = `Latitude: ${object.latitude}\nLongitude: ${object.longitude}`;

    return `${object.name} ${nameRoman}\n${object.address}\n${coordinates}`;
  }, []);

  return (
    <DeckGL
      viewState={viewStates}
      controller
      layers={layers}
      views={[new MapView({ id: "main", controller: true })]}
      onViewStateChange={handleViewStateChange}
      getTooltip={getTooltip}
    >
      <Map mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json" />
    </DeckGL>
  );
};
