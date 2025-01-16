
export type product = {
    name: string;
    price: number;
    id: number;
};

export type statistic = {
    entryId: number;
    stat: string;
}

export type statSection = {
  statisticId: number;
  title: string;
  data: statistic[];
};