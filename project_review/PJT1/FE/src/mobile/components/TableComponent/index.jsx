import React, { useRef, useEffect } from "react";
import AudioPlayer from "../AudioPlayer";
import "./TableComponent.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableComponent = ({ items }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const tableContainerRef = useRef(null);

  if (!Array.isArray(items)) {
    items = [];
  }

  const lengthCheck = items.length > 0;
  const length = items.length;

  useEffect(() => {
    if (items[length - 1]?.name === user?.name) {
      if (tableContainerRef.current) {
        tableContainerRef.current.scrollTop =
          tableContainerRef.current.scrollHeight;
      }
    }
  }, [items]);

  return (
    <div style={{ marginTop: items.length === 0 && "50%", width: "100%" }}>
      {lengthCheck ? (
        <TableContainer
          ref={tableContainerRef}
          className="MTableContainer"
          onWheel={(e) => e.stopPropagation()}
          component={Paper}
        >
          <Table
            sx={{
              maxWidth: 380,
              backgroundColor: "#FFAAA6",
            }}
            aria-label="simple table"
          >
            <TableHead
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "white",
              }}
            >
              <TableRow>
                <TableCell
                  sx={{
                    fontFamily: "yg-jalnan",
                    color: "#FFAAA6",
                    fontWeight: "bold",
                  }}
                >
                  <h6 style={{ fontSize: "0.5rem" }}>순서</h6>
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "yg-jalnan",
                    color: "#FFAAA6",
                    fontWeight: "bold",
                  }}
                  align="right"
                >
                  <h6 style={{ fontSize: "0.5rem" }}>닉네임</h6>
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "yg-jalnan",
                    color: "#FFAAA6",
                    fontWeight: "bold",
                  }}
                  align="right"
                >
                  <h6 style={{ fontSize: "0.5rem" }}>보낸 위치</h6>
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "yg-jalnan",
                    color: "#FFAAA6",
                    fontWeight: "bold",
                  }}
                  align="right"
                >
                  <h6 style={{ fontSize: "0.5rem" }}>받는 위치</h6>
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "yg-jalnan",
                    color: "#FFAAA6",
                    fontWeight: "bold",
                  }}
                  align="right"
                >
                  <h6 style={{ fontSize: "0.5rem" }}>음성 녹음</h6>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    backgroundColor: user?.name === row.name && "#FFB200",
                  }}
                >
                  <TableCell
                    sx={{
                      color: "white",
                      fontFamily: "yg-jalnan",
                    }}
                    align="left"
                  >
                    <h6 style={{ fontSize: "0.5rem" }}>{index + 1}</h6>
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      color: "white",
                      fontFamily: "yg-jalnan",
                    }}
                    component="th"
                    scope="row"
                    align="right"
                  >
                    <h6 style={{ fontSize: "0.5rem" }}>{row.name}</h6>
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontFamily: "yg-jalnan" }}
                    align="right"
                  >
                    <h6 style={{ fontSize: "0.5rem" }}>{row.from}</h6>
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontFamily: "yg-jalnan" }}
                    align="right"
                  >
                    <h6 style={{ fontSize: "0.5rem" }}>{row.to}</h6>
                  </TableCell>
                  {row.record ? (
                    user?.name === row.name ? (
                      <TableCell
                        sx={{
                          color: "white",
                          fontFamily: "yg-jalnan",
                          padding: "-16px 0",
                        }}
                        align="right"
                      >
                        <AudioPlayer src={`${row.record}`} />
                      </TableCell>
                    ) : (
                      <TableCell
                        sx={{ color: "white", fontFamily: "yg-jalnan" }}
                        align="right"
                      >
                        <h6 style={{ fontSize: "0.5rem" }}>O</h6>
                      </TableCell>
                    )
                  ) : (
                    <TableCell
                      sx={{ color: "white", fontFamily: "yg-jalnan" }}
                      align="right"
                    >
                      <h6 style={{ fontSize: "0.5rem" }}>X</h6>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <h2>아직 신청한 사람이 없습니다!</h2>
      )}
    </div>
  );
};

export default TableComponent;
