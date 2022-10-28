export type CardType = {
  id: number;
  matched: boolean;
  image: string;
};
export type GridType = CardType[];

const createGrid: () => GridType = () => {
  const assets = [
    { image: "/assets/dart.png" },
    { image: "/assets/flutter.png" },
    { image: "/assets/go.png" },
    { image: "/assets/jsx.png" },
    { image: "/assets/next.png" },
    { image: "/assets/node.png" },
    { image: "/assets/rust.png" },
    { image: "/assets/ts.png" },
  ];

  return [...assets, ...assets]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({
      ...card,
      id: Math.random(),
      matched: false,
    }));
};

export default createGrid;
