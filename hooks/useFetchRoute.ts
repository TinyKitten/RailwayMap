import { grpcClient } from "@/api/client";
import { GetRouteRequest } from "@/gen/proto/stationapi_pb";
import { generateSWRKey } from "@/utils/generateSWRKey";
import { groupStations } from "@/utils/groupStations";
import useSWRImmutable from "swr/immutable";

export const useFetchRoute = (
  fromStationGroupId: number,
  toStationGroupId: number
) => {
  const req = new GetRouteRequest({ fromStationGroupId, toStationGroupId });

  const swrKey = generateSWRKey("getRoute", req);

  const {
    data: stations,
    error,
    isLoading,
  } = useSWRImmutable(swrKey, async () => {
    const res = await grpcClient.getRoutes(req);
    const localOnly = res.routes
      .filter((r) => r.stops.some((s) => s.trainType?.typeId === 154))
      .flatMap((r) => r.stops);
    console.log(localOnly);
    return groupStations(localOnly ?? []);
  });

  const uniqueStations = Array.from(
    new Map(stations?.map((sta) => [sta.groupId, sta])).values()
  );

  return { stations: uniqueStations, error, isLoading };
};
