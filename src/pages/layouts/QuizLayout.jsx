import Card from "react-bootstrap/Card";
import mauritius from '../../static/mauritius.png';
import QuestionCard from '../../components/QuestionCard';
import { Link } from 'react-router-dom';




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
    <div>
    <Link to='/'><button className="button-19">Back to start</button></Link>

    <div className="container-fluid" style={{height: "800px"}}>
      
    <div className="h-75 d-flex flex-row d-flex justify-content-around col-md-auto">
      <div className="h-100 col-sm align-items-center justify-content-around">
      <BuildQuestionCard data={data}/>
      </div>
    </div>
    <BuildPictureCard className="h-25" picture={mauritius} />
    </div>
    </div>
  );
};

export default QuizLayout;
