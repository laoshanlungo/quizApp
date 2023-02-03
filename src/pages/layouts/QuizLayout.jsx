import Card from "react-bootstrap/Card";
import mauritius from '../../static/mauritius.png';
import QuestionCard from '../../components/QuestionCard';




const QuizLayout = ({data}) => {


  const BuildQuestionCard = ({ data }) => {
    return data.map((dataEntry) => {
      return(
      <QuestionCard question={dataEntry.question} answers={dataEntry.answers} solve={dataEntry.solve} picture={mauritius} />
      )
    })
  }

  const BuildPictureCard = ({ picture }) => {
    return(
      <Card className="align-items-center" style={{ width: "36rem" }}>
      <Card.Body>
      <img src={picture} alt="Logo" />
      </Card.Body>
    </Card>
    )
  }

  return (
    <div class="container">
    <div className="d-flex flex-column align-items-center justify-content-around">
    <div className="d-flex flex-row d-flex justify-content-around col-md-auto">
      <div className="d-flex flex-column align-items-center justify-content-around">
      <BuildQuestionCard data={data}/>
      </div>
    </div>
    <BuildPictureCard picture={mauritius} />
    </div>
    </div>
  );
};

export default QuizLayout;
