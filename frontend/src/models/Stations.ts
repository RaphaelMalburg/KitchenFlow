export interface StationDTO {
  id: number;
  name: string;
  userId: string;
}
export interface StoragePlacesDTO {
  id: number;
  name: string;
  stationId: number;
  description: string;
}

export interface PrepListItemDTO {
  id: number;
  name: string;
  amount: number;
  storagePlaceId: number;
  stationId: number;
  unitMeasureId: number;
  isDone: boolean;
  quantity?: number;
}

export interface PrepListDTO {
  id: number;
  name: string;
  description: string;
}
export interface UnitOfMeasureDTO {
  id: number;
  name: string;
}

export interface PreplistItemForArrayDTO {
  id: number;
  unitOfMeasureId: number;
  quantity?: number;
}
