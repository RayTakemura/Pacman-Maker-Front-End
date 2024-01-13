type Props = {
  score: number;
};
function InGameScore({ score }: Props) {
  return (
    <>
      <p className="text-white">
        <span>Score: </span> <span>{score}</span>
      </p>
    </>
  );
}
export default InGameScore;
