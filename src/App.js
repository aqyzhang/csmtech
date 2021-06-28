import React, { useMemo, useState, useEffect } from "react";
import axios from 'axios';
import Table from "./Table";
import "./App.css";

const Topics = ({ values }) => {
  return (
    <>
      {values.map((topic, idx) => {
        return (
          <span key={idx} className="badge">
            {topic}
          </span>
        );
      })}
    </>
  );
};

function App() {
  const columns = useMemo(
    () => [
      {
        Header: "Time",
        columns: [
          {
            Header: "Week",
            accessor: "week"
          },
          {
            Header: "Date",
            accessor: "date"
          }
        ]
      },
      {
        Header: "Content",
        columns: [
          {
            Header: "Topic(s)",
            accessor: "topics",
            Cell: ({ cell: { value } }) => <Topics values={value} />
          },
          {
            Header: "Worksheet",
            accessor: "wkst"
          },
          {
            Header: "Solution",
            accessor: "sol",
          },
          {
            Header: "Resources",
            accessor: "resources",
            Cell: ({ cell: { value } }) => <Topics values={value} />
          },
          {
            Header: "FAQ",
            accessor: "faq"
          }
        ]
      }
    ],
    []
  );

  // API Endpoint Call

  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     const result = await axios("https://api.tvmaze.com/search/shows?q=snow");
  //     setData(result.data);
  //   })();
  // }, []);


  // Self-populated data
   const data = React.useMemo(
     () => [
        {
          "week": 1,
          "date": "6/21",
          "topics": [
            "Functions",
            "Control"
          ],
          "wkst": "Worksheet 1",
          "sol": "Solution 1",
          "resources": [
            "Python File",
            "Link 1",
            "Link 2"
          ],
          "faq": "FAQ 1"
        },
        {
          "week": 2,
          "date": "6/28",
          "topics": [
            "Environment Diagrams",
            "Higher Order Functions"
          ],
          "wkst": "Worksheet 2",
          "sol": "Solution 2",
          "resources": [
            "Python File",
            "Link 1",
            "Link 2"
          ],
          "faq": "FAQ 2"
        },
        {
          "week": 3,
          "date": "7/5",
          "topics": [
            "Recursion",
            "Tree Recursion"
          ],
          "wkst": "Worksheet 3",
          "sol": "Solution 3",
          "resources": [
            "Python File",
            "Link 1",
            "Link 2",
          ],
          "faq": "FAQ 3"
        },
        {
          "week": 4,
          "date": "7/12",
          "topics": [
            "List",
            "Trees",
            "Abstraction"
          ],
          "wkst": "Worksheet 4",
          "sol": "Solution 4",
          "resources": [
            "Python File",
            "Link 1",
            "Link 2"
          ],
          "faq": "FAQ 4"
        }
     ],
     []
 )

//  const columns = useMemo(
//     () => [
//       {
//         Header: "TV Show",
//         columns: [
//           {
//             Header: "Name",
//             accessor: "show.name"
//           },
//           {
//             Header: "Type",
//             accessor: "show.type"
//           }
//         ]
//       },
//       {
//         Header: "Details",
//         columns: [
//           {
//             Header: "Language",
//             accessor: "show.language"
//           },
//           {
//             Header: "Genre(s)",
//             accessor: "show.genres",
//             Cell: ({ cell: { value } }) => <Genres values={value} />
//           },
//           {
//             Header: "Runtime",
//             accessor: "show.runtime",
//             Cell: ({ cell: { value } }) => {
//               const hour = Math.floor(value / 60);
//               const min = Math.floor(value % 60);
//               return (
//                 <>
//                   {hour > 0 ? `${hour} hr${hour > 1 ? "s" : ""} ` : ""}
//                   {min > 0 ? `${min} min${min > 1 ? "s" : ""}` : ""}
//                 </>
//               );
//             }
//           },
//           {
//             Header: "Status",
//             accessor: "show.status"
//           }
//         ]
//       }
//     ],
//     []
//   );

//     const data = React.useMemo(
//      () => [
//         {
//           "score": 17.592657,
//           "show": {
//             "id": 44813,
//             "url": "http://www.tvmaze.com/shows/44813/the-snow-spider",
//             "name": "The Snow Spider",
//             "type": "Scripted",
//             "language": "English",
//             "genres": [
//               "Drama",
//               "Fantasy"
//             ],
//             "status": "In Development",
//             "runtime": 30
//           },
//         },
//         {
//           "score": 0.657835,
//           "show": {
//             "id": 12393,
//             "url": "https://www.tvmaze.com/shows/12393/snow-white",
//             "name": "Snow White",
//             "type": "Scripted",
//             "language": "Korean",
//             "genres": [
//                 "Drama",
//                 "Comedy",
//                 "Romance"
//             ],
//             "status": "Ended",
//             "runtime": 60,
//           },
//         },
//         {
//         "score": 0.6546594,
//         "show": {
//             "id": 14031,
//             "url": "https://www.tvmaze.com/shows/14031/snow-babies",
//             "name": "Snow Babies",
//             "type": "Documentary",
//             "language": "English",
//             "genres": [
//                 "Nature"
//             ],
//             "status": "Ended",
//             "runtime": 60,
//           }
//         }
//      ],
//      []
//  )

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;