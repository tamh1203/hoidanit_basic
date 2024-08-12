import "./DashBoard.scss"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from 'recharts';
import { getOverview } from "../../../Services/apiservice";
import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

const Dashboard = (props) => {
  const { t } = useTranslation();// transtation

  const [dataOverView, setDataOverView] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  useEffect(() => {
    fetchDataOverView();
  }, [])

  const fetchDataOverView = async () => {
    let res = await getOverview()
    if (res && res.EC === 0) {
      setDataOverView(res.DT);
      // process dataCharts
      let Qz, Qs, As = 0;
      Qz = res.DT.others.countQuiz;
      Qs = res.DT.others.countQuestions;
      As = res.DT.others.countAnswers;
      const data = [
        {
          name: 'Quizzes',
          Qz: Qz,
        },
        {
          name: 'Question',
          Qs: Qs,
        },
        {
          name: 'Answers',
          As: As,
        },
      ];
      console.log("check res >>", res);
      setDataChart(data)
    }
  };

  return (
    <div className="dashboard-container">
      <div className="title">
        {t("dashboard.title")}
      </div>
      <div className="wellcome">
        {t("dashboard.wellcom")}
      </div>
      <div className="content">
        <div className="left-content">
          <div className="child">
            <span className="text-1"> {t("dashboard.text1")}</span>
            <span className="text-2">
              {dataOverView && dataOverView.users
                && dataOverView.users.total
                ?
                <>
                  {dataOverView.users.total}
                </>
                :
                <>
                  0
                </>
              }
            </span>
          </div>
          <div className="child">
            <span className="text-1">{t("dashboard.text2")}</span>
            <span className="text-2">
              {dataOverView && dataOverView.others
                && dataOverView.others.countQuiz
                ?
                <>
                  {dataOverView.others.countQuiz}
                </>
                :
                <>
                  0
                </>
              }
            </span>
          </div>
          <div className="child">
            <span className="text-1">{t("dashboard.text3")}</span>
            <span className="text-2">
              {dataOverView && dataOverView.others
                && dataOverView.others.countQuestions
                ?
                <>
                  {dataOverView.others.countQuestions}
                </>
                :
                <>
                  0
                </>
              }</span>
          </div>
          <div className="child">
            <span className="text-1">{t("dashboard.text4")}</span>
            <span className="text-2">
              {dataOverView && dataOverView.others
                && dataOverView.others.countAnswers
                ?
                <>
                  {dataOverView.others.countAnswers}
                </>
                :
                <>
                  0
                </>
              }
            </span>
          </div>
        </div>
        <div className="right-content">
          <ResponsiveContainer width="95%" height="100%">
            <BarChart
              data={dataChart}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Qz" fill="#fd7e14" />
              <Bar dataKey="Qs" fill="#82ca9d" />
              <Bar dataKey="As" fill="#6610f2" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard