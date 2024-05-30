interface BoardPageProps {
  params: {
    boardId: string;
  };
}

const BoardPage = ({ params: { boardId } }: BoardPageProps) => {
  return <div> board ID : {boardId}</div>;
};

export default BoardPage;
