// import React, { useState } from "react";
// import axios from "axios";

// function AccessData() {
//   const [password, setPassword] = useState("");
//   const [tables, setTables] = useState([]);
//   const [tableData, setTableData] = useState([]);
//   const [selectedTable, setSelectedTable] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleAccess = async () => {
//     if (!password.trim()) {
//       setMessage("Please Enter Password");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await axios.post(
//         "http://localhost:5000/api/access",
//         {
//           password,
//         }
//       );

//       setTables(response.data.tables || []);
//       setMessage("✅ Database Connected Successfully");
//     } catch (error) {
//       console.log(error);
//       setMessage("❌ Invalid Password Or Backend Not Running");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchTableData = async (tableName) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/table/${tableName}`
//       );

//       setTableData(response.data.data);
//       setSelectedTable(tableName);
//     } catch (error) {
//       console.log(error);
//       alert("Unable To Fetch Table Data");
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         padding: "30px",
//         background:
//           "linear-gradient(135deg,#0f172a,#1e293b,#334155)",
//       }}
//     >
//       <div
//         style={{
//           width: "700px",
//           margin: "0 auto",
//           background: "#fff",
//           padding: "30px",
//           borderRadius: "20px",
//           boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
//         }}
//       >
//         <h1
//           style={{
//             textAlign: "center",
//             marginBottom: "25px",
//           }}
//         >
//           Access Database
//         </h1>

//         <input
//           type="password"
//           placeholder="Enter MDB Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           style={{
//             width: "100%",
//             padding: "15px",
//             borderRadius: "10px",
//             border: "1px solid #ccc",
//             marginBottom: "15px",
//             boxSizing: "border-box",
//           }}
//         />

//         <button
//           onClick={handleAccess}
//           style={{
//             width: "100%",
//             padding: "15px",
//             background: "#2563eb",
//             color: "#fff",
//             border: "none",
//             borderRadius: "10px",
//             cursor: "pointer",
//             fontSize: "16px",
//             fontWeight: "bold",
//           }}
//         >
//           {loading ? "Connecting..." : "Access Database"}
//         </button>

//         {message && (
//           <h3
//             style={{
//               color: message.includes("Connected")
//                 ? "green"
//                 : "red",
//               marginTop: "15px",
//             }}
//           >
//             {message}
//           </h3>
//         )}

//         {tables.length > 0 && (
//           <>
//             <h2>Database Tables</h2>

//             <div
//               style={{
//                 display: "flex",
//                 gap: "10px",
//                 flexWrap: "wrap",
//               }}
//             >
//               {tables.map((table, index) => (
//                 <button
//                   key={index}
//                   onClick={() => fetchTableData(table)}
//                   style={{
//                     padding: "10px 20px",
//                     border: "none",
//                     borderRadius: "8px",
//                     background: "#e2e8f0",
//                     cursor: "pointer",
//                     fontWeight: "600",
//                   }}
//                 >
//                   {table}
//                 </button>
//               ))}
//             </div>
//           </>
//         )}

//         {tableData.length > 0 && (
//           <>
//             <h2 style={{ marginTop: "30px" }}>
//               {selectedTable} Data
//             </h2>

//             <div
//               style={{
//                 overflowX: "auto",
//               }}
//             >
//               <table
//                 style={{
//                   width: "100%",
//                   borderCollapse: "collapse",
//                 }}
//               >
//                 <thead>
//                   <tr>
//                     {Object.keys(tableData[0]).map((key) => (
//                       <th
//                         key={key}
//                         style={{
//                           background: "#2563eb",
//                           color: "white",
//                           padding: "10px",
//                           border: "1px solid #ddd",
//                         }}
//                       >
//                         {key}
//                       </th>
//                     ))}
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {tableData.map((row, index) => (
//                     <tr key={index}>
//                       {Object.values(row).map((value, i) => (
//                         <td
//                           key={i}
//                           style={{
//                             padding: "10px",
//                             border: "1px solid #ddd",
//                           }}
//                         >
//                           {String(value)}
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AccessData;








































import React, { useState } from "react";
import axios from "axios";

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Avatar,
  Chip,
  Divider,
  TableContainer,
} from "@mui/material";

function AccessData() {
  const [password, setPassword] = useState("");
  const [tables, setTables] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
const [search, setSearch] = useState("");
const [recordCount, setRecordCount] = useState(0);

 

  const handleAccess = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/api/access",
        { password }
      );

      setTables(response.data.tables);
      setMessage("Database Connected Successfully");
    } catch (error) {
      setMessage("Invalid Password");
    } finally {
      setLoading(false);
    }
  };

 const fetchTableData = async (table) => {
  try {
    setTableLoading(true);

    setSelectedTable(table);

    const response = await axios.get(
      `http://localhost:5000/api/table/${table}`
    );

    console.log("API RESPONSE:", response.data);

    setTableData(response.data.data || []);
    setRecordCount(response.data.count || 0);

  } catch (error) {
    console.error(error);
    setTableData([]);
    setRecordCount(0);
  } finally {
    setTableLoading(false);
  }
};


  return (
    <Box
      sx={{
        minHeight: "100vh",
       background:
  "linear-gradient(135deg,#0f172a,#1e293b,#334155)",
        p: 3,
      }}
    >
      {/* Login Card */}

      <Paper
  sx={{
    p: 4,
    mb: 3,
    borderRadius: 4,
    maxWidth: "700px",
    mx: "auto",
    boxShadow:
      "0px 10px 30px rgba(0,0,0,0.25)",
  }}
>
       <Box
  display="flex"
  alignItems="center"
  gap={2}
  mb={2}
>
  <Avatar
    sx={{
      bgcolor: "#1976d2",
      width: 50,
      height: 50,
    }}
  >
    DB
  </Avatar>

  <Typography
    variant="h4"
    fontWeight="bold"
  >
    RCL Database Portal
  </Typography>
</Box>

        <TextField
  fullWidth
  type="password"
  label="MDB Password"
  value={password}
  onChange={(e) =>
    setPassword(e.target.value)
  }
  sx={{
    mt: 2,
  }}
/>

       <Button
  variant="contained"
  fullWidth
  size="large"
  sx={{
    mt: 2,
    py: 1.5,
    borderRadius: 3,
  }}
  onClick={handleAccess}
>
          {loading ? (
            <CircularProgress size={25} />
          ) : (
            "Connect Database"
          )}
        </Button>

        <Typography
          mt={2}
          color={
            message.includes("Successfully")
              ? "green"
              : "red"
          }
        >
          {message}
        </Typography>
      </Paper>

      {tables.length > 0 && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            height: "75vh",
          }}
        >
          {/* Sidebar */}

          <Paper
            sx={{
              width: "280px",
              overflow: "auto",
            }}
          >

         <TextField
  size="small"
  fullWidth
  placeholder="Search Collection..."
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  sx={{ p: 1 }}
/>

          <Typography
  variant="h6"
  sx={{
    p: 2,
    fontWeight: "bold",
    bgcolor: "#1976d2",
    color: "#fff",
    textAlign: "center",
  }}
>
  Collections ({tables.length})
</Typography>

            <List>
  {tables
    .filter((table) =>
      table
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .map((table) => (
      <ListItemButton
        key={table}
        selected={
          selectedTable === table
        }
        onClick={() =>
          fetchTableData(table)
        }
      >
        <ListItemText
          primary={table}
        />
      </ListItemButton>
    ))}
</List>
          </Paper>

          {/* Data */}

          <Paper
            sx={{
              flex: 1,
              overflow: "auto",
            }}
          >
            <Box p={2}>
             <Box
  display="flex"
  justifyContent="space-between"
  alignItems="center"
>
  <Typography
    variant="h5"
    fontWeight="bold"
  >
    {selectedTable}
  </Typography>

  <Chip
    color="success"
    label="MongoDB Collection"
  />
</Box>

<Divider sx={{ my: 2 }} />

           <Chip
  label={`Records : ${recordCount}`}
  color="primary"
  sx={{ mb: 2 }}
/>

        {tableLoading ? (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "300px",
    }}
  >
    <CircularProgress />
  </Box>
) : tableData.length > 0 ? (
  <TableContainer
    sx={{
      maxHeight: 600,
      borderRadius: 2,
      border: "1px solid #ddd",
    }}
  >
    <Table stickyHeader size="small">
      <TableHead>
        <TableRow>
          {Object.keys(tableData[0]).map((key) => (
            <TableCell
              key={key}
              sx={{
                fontWeight: "bold",
                backgroundColor: "#1976d2",
                color: "#fff",
                whiteSpace: "nowrap",
              }}
            >
              {key}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>

      <TableBody>
        {tableData.map((row, index) => (
          <TableRow key={index} hover>
            {Object.values(row).map((value, i) => (
              <TableCell
                key={i}
                sx={{
                  maxWidth: 250,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {String(value)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
) : (
  <Typography
    align="center"
    color="text.secondary"
    mt={5}
  >
    No Data Found
  </Typography>
)}
      
  
            </Box>
          </Paper>
        </Box>
      )}
    </Box>
  );
}

export default AccessData;










































