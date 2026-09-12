export type StravaAthlete = {
  id: number;
  firstname: string;
  lastname: string;
  profile: string;
};

export type StravaActivity = {
  id: number;
  name: string;
  type: string;
  distance: number;
  moving_time: number;
  total_elevation_gain: number;
  start_date: string;
  start_date_local: string;
  map: { summary_polyline: string | null } | null;
};

export type StravaRoute = {
  id: number;
  id_str: string;
  name: string;
  distance: number;
  elevation_gain: number;
  created_at: string;
  map: { summary_polyline: string | null } | null;
};
