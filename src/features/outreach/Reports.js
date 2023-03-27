import { useNavigate } from "react-router-dom";
import { useGetAnexCQuery } from "./anexC_ApiSlice";
import { memo } from "react";

const Reports = ({ reportId }) => {
  const { anexC } = useGetAnexCQuery("reportList", {
    selectFromResult: ({ data }) => ({
      anexC: data?.entities[reportId],
    }),
  });
  // console.log(anexC);
  const navigate = useNavigate();

  const allReport = { ...anexC };

  const handleView = () => navigate(`/dash/reports/view/${allReport.id}`);

  // console.log(allReport.target_beneficiary);

console.log(allReport);
  if (allReport) {
    const created = new Date(allReport.createdAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });

    const updated = new Date(allReport.updatedAt).toLocaleString("en-US", {
      day: "numeric",
      month: "long",
    });
    console.log(allReport);
    // const handleEdit = () => navigate(`/dash/report/${reportId}`)
    return (
      <tr className="text-left border px-8">
        <td className="px-6 text-sm font-medium text-gray-900">
          {allReport.user}
        </td>
        <td className="text-sm font-medium text-gray-900">
          {allReport.fullname}
        </td>
        <td className="text-sm font-medium text-gray-900">
          {allReport.sponsor_dept}
        </td>
        <td className="whitespace-nowrap text-sm font-medium text-gray-900">
          {allReport.date_implement}
        </td>
        <td className="text-sm font-medium text-gray-900">{created}</td>
        <td className="text-sm font-medium text-gray-900">
          {allReport.project_title}
        </td>
        <td className="text-sm font-medium text-gray-900">
          {allReport.target_beneficiary}
        </td>
        <td className="text-sm font-medium text-gray-900">{allReport.venue}</td>
        <td className="text-sm flex font-medium grid-cols-2 text-gray-900">
          <button
            className="text-white bg-red-900 hover:bg-red-800 font-medium rounded-lg text-sm px-4 py-2.5 m-1 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
            onClick={handleView}
          >
            View
          </button>
        </td>
      </tr>
    );
  } else return null;
};

const memoizedReport = memo(Reports);

export default memoizedReport;
