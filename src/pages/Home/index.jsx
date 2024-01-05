import { useEffect, useState } from "react";
import { Space, Empty, Card, DatePicker } from "antd";
import AllExpensesRecords from "./components/AllExpensesRecords";
import { useSelector } from "react-redux";
import OverallStatistics from "./components/OverallStatistics";
import { SimpleBarChartOption } from "../../utils/SimpleBarChartOption";
import ReactEcharts from "echarts-for-react";
import dayjs from "dayjs";
import useUserTheme from "../../hooks/useUserTheme";
import { getOverallSummary, getMonthlySummary } from "../../api/statistics.api";
import { getExpenseByUserId } from "../../api/expense.api";
import { getAllExpenseCategory } from "../../api/setting.api";

function Home() {
  const { user } = useSelector((state) => state.user);
  const theme = useUserTheme();
  const [overallStats, setOverallStats] = useState({});
  const [allExpenses, setAllExpenses] = useState([]);
  const [allCategories, setAllCategories] = useState([]);

  //charts
  const [monthlySummary, setMonthlySummary] = useState();
  const [monthlySummaryYear, setMonthlySummaryYear] = useState("2024");

  const getOverall = async (userId) => {
    await getOverallSummary(userId, {
      year: dayjs().year(),
    }).then((res) => {
      if (res && res.status !== false) {
        setOverallStats(res);
      }
    });
  };

  const getAllCategory = async () => {
    await getAllExpenseCategory(user.id).then((res) => {
      if (res && res.status !== false) {
        setAllCategories(res);
      }
    });
  };

  const getAllExpenses = async (userId) => {
    await getExpenseByUserId(userId).then((res) => {
      if (res && res.status !== false) {
        setAllExpenses(res);
      }
    });
  };

  const getMonthly = async (userId) => {
    await getMonthlySummary(userId, {
      year: parseInt(monthlySummaryYear),
    }).then((res) => {
      if (res && res.status !== false) {
        setMonthlySummary(res);
      }
    });
  };

  const getAllData = () => {
    const userId = user.id;
    getOverall(userId);
    getAllExpenses(userId);
    getAllCategory(userId);
  };

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    getMonthly(user.id);
  }, [monthlySummaryYear]);

  const onBarChartChange = (_date, dateString) => {
    setMonthlySummaryYear(dateString);
  };

  return (
    <Space
      direction="vertical"
      size="small"
      style={{
        display: "flex",
      }}
    >
      <OverallStatistics overallStats={overallStats} />

      <AllExpensesRecords
        allExpenses={allExpenses}
        allCategories={allCategories}
        getAllData={getAllData}
      />

      <Card
        style={{
          width: "100%",
          padding: "10px",
          height: "100%",
          borderRadius: 10,
          ...(monthlySummary
            ? {}
            : {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }),
        }}
      >
        <DatePicker
          style={{ float: "right" }}
          onChange={onBarChartChange}
          defaultValue={dayjs()}
          picker="year"
        />
        {monthlySummary ? (
          <ReactEcharts
            style={{
              marginTop: "3rem",
            }}
            option={SimpleBarChartOption(
              Object.keys(monthlySummary),
              Object.values(monthlySummary),
              "Monthly Expense"
            )}
            theme={theme}
          />
        ) : (
          <Empty description={"No data available to show"} />
        )}
      </Card>
    </Space>
  );
}

export default Home;
