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

const TableComponent = ({ items, removeData, setCheck, user }) => {
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
    <div style={{ marginTop: items.length === 0 && "50%" }}>
      {lengthCheck ? (
        <TableContainer
          ref={tableContainerRef}
          className="TableContainer"
          onWheel={(e) => e.stopPropagation()}
          component={Paper}
        >
          <Table
            sx={{
              minWidth: 700,
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
                  순서
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "yg-jalnan",
                    color: "#FFAAA6",
                    fontWeight: "bold",
                  }}
                  align="right"
                >
                  닉네임
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "yg-jalnan",
                    color: "#FFAAA6",
                    fontWeight: "bold",
                  }}
                  align="right"
                >
                  보낸 위치
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "yg-jalnan",
                    color: "#FFAAA6",
                    fontWeight: "bold",
                  }}
                  align="right"
                >
                  받는 위치
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "yg-jalnan",
                    color: "#FFAAA6",
                    fontWeight: "bold",
                  }}
                  align="right"
                >
                  음성 녹음
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "yg-jalnan",
                    color: "#FFAAA6",
                    fontWeight: "bold",
                  }}
                  align="center"
                >
                  비고
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
                    {index + 1}
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
                    {row.name}
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontFamily: "yg-jalnan" }}
                    align="right"
                  >
                    {row.from}
                  </TableCell>
                  <TableCell
                    sx={{ color: "white", fontFamily: "yg-jalnan" }}
                    align="right"
                  >
                    {row.to}
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
                        O
                      </TableCell>
                    )
                  ) : (
                    <TableCell
                      sx={{ color: "white", fontFamily: "yg-jalnan" }}
                      align="right"
                    >
                      X
                    </TableCell>
                  )}
                  <TableCell align="center">
                    {row.name === user?.name && (
                      <button
                        className="remove-btn"
                        onClick={() => {
                          removeData();
                          setCheck(false);
                        }}
                      >
                        무르기
                      </button>
                    )}
                  </TableCell>
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
