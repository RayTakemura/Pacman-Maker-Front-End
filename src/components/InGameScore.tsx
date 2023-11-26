type Props = {
  score: number;
};
function InGameScore({ score }: Props) {
  return (
    <>
      <p>
        <span>Score: </span> <span>{score}</span>
      </p>
    </>
  );
}
export default InGameScore;
