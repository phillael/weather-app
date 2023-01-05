export interface ForecastRowProps {
  /** A moji to represent weather conditions */
  image: string;
  /** Day of the week */
  day: string;
  /** Description of weather conditions */
  description: string;
  /** High temp of given day */
  high: string;
  /** Low temp of given day */
  low: string;
  /** Index of row */
  idx: number;
}
