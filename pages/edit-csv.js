import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { parse } from "papaparse";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Stepper from "react-stepper-horizontal/lib/Stepper";
import CsvNavigateButton from "../components/CsvNavigationButton";
import EditReactTable from "../components/EditReactTable";
import ReactTable from "../components/ReactTable";

const EditCsv = () => {
  const { push } = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated: () => push("/auth/signIn"),
  });

  console.log(status, session);

  useEffect(() => {
    checkLoading();
  }, []);

  const checkLoading = () => {
    if (status === "loading") {
      return <div>Loading...</div>;
    }
  };

  // table state
  const [fileName, setFileName] = useState("");
  const [csv, setCsv] = useState([]);
  const [column, setColumn] = useState([]);

  // steps state
  // https://www.npmjs.com/package/react-stepper-horizontal
  const [currentPage, setCurrentPage] = useState(0);
  const sections = [
    { title: "Upload CSV file" },
    { title: "View your file" },
    { title: "Edit your file" },
    { title: "Submit your file" },
  ];
  const router = useRouter();
  const next = () => setCurrentPage(currentPage + 1);
  const prev = () => setCurrentPage(currentPage - 1);

  const handleFile = (e) => {
    e.preventDefault();

    // verify the file type
    // console.log(e.target?.files[0].type); // choose from file
    // console.log(e.dataTransfer?.files[0].type); // drop file

    // determine the html event type (in this case, "drop" or "change")
    // different events use different methods to get the file (e.g. "dataTransfer" or "target")
    Array.from(e.type === "drop" ? e.dataTransfer.files : e.target.files).filter((file) =>
      // dont know why the csv file type change from "application/vnd.ms-excel" to "text/csv", keep it here for future reference
      file.type === "application/vnd.ms-excel" || file.type === "text/csv"
        ? Array.from(e.type === "drop" ? e.dataTransfer.files : e.target.files).forEach(
            async (file) => {
              const text = await file.text();

              const result = parse(text, { header: true });

              setFileName(file.name);

              let resultData = result.data;
              // https://stackoverflow.com/questions/63544374/how-to-replace-white-space-and-remove-special-characters-from-all-keys-of-an-obj
              const changeKeys = (item, index) => {
                return Object.keys(item).reduce((result, key) => {
                  const cleanKey = key
                    // .replace(/\s+/g, "_")
                    .replace(/\W+/g, "");
                  result[cleanKey] = resultData[index][key];
                  return result;
                }, {});
              };

              const applyChangedKeys = resultData.map(changeKeys);

              setCsv(applyChangedKeys);

              // get the keys from the first object and set them as the column
              const keyName = applyChangedKeys.map((item) => Object.keys(item));

              setColumn(keyName[0]);
              // alert("file uploaded successfully");
              next();
            }
          )
        : alert("Wrong file type, please upload a CSV file")
    );
  };

  const data = useMemo(() => csv, [csv]);
  const columns = useMemo(() =>
    column.map((item) => {
      return {
        Header: item,
        accessor: item,
      };
    })
  );

  const handleSubmit = () => {
    next();
    console.log(csv);
  };

  if (!session) {
    return <div>No User</div>;
  }

  return (
    <div>
      {/* <h3 className="mb-5">CSV Importer</h3> */}
      <div className="border-bottom pt-2">
        <h4>Edit CSV Importer</h4>
      </div>

      <div className="pt-3 px-2">
        {/* react-stepper-horizontal UI */}
        <Stepper
          steps={sections}
          activeStep={currentPage}
          defaultColor="grey"
          activeColor="green"
          completeColor="green"
          defaultBarColor="grey"
          completeBarColor="green"
          completeTitleColor="white"
          activeTitleColor="white"
          defaultTitleColor="white"
        />

        {currentPage === 0 && (
          <>
            {csv.length === 0 && (
              <>
                <Form.Group controlId="formFile" className="mt-5 mb-3">
                  <Form.Label>Upload from your folder</Form.Label>
                  <Form.Control type="file" onChange={(e) => handleFile(e)} />
                </Form.Group>

                <h1 className="text-center my-5">Or</h1>

                <div
                  className="d-flex align-items-center justify-content-center border rounded-3"
                  style={{ height: "200px" }}
                  // https://www.youtube.com/watch?v=SmIRn6uVVVI&ab_channel=LeighHalliday
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleFile(e)}
                >
                  Drop your CSV file here
                </div>

                <br />
                <a
                  href="https://extendsclass.com/csv-generator.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Upload a file with csv generator
                </a>
              </>
            )}
          </>
        )}

        {currentPage === 1 && (
          <>
            <br />
            <Row className="mt-2">
              <Col>
                <h3>{fileName}</h3>
              </Col>
              <Col className="d-flex justify-content-end">
                <CsvNavigateButton text="Resubmit" onClick={() => router.reload()} />
                <CsvNavigateButton text="Next" onClick={next} />
              </Col>
            </Row>
            <ReactTable columns={columns} data={data} />
          </>
        )}

        {currentPage === 2 && (
          <>
            <br />
            <Row className="mt-2">
              <Col>
                <h3>{fileName}</h3>
              </Col>
              <Col className="d-flex justify-content-end">
                <CsvNavigateButton text="Back" onClick={prev} />
                <CsvNavigateButton text="Submit" onClick={handleSubmit} />
              </Col>
            </Row>
            <EditReactTable columns={columns} data={data} setCsv={setCsv} />
          </>
        )}

        {currentPage === 3 && (
          <>
            <br />
            <Row className="mt-2">
              <Col>
                <h3>CSV file imported</h3>
              </Col>
              <Col className="d-flex justify-content-end">
                <CsvNavigateButton text="Upload a new CSV File" onClick={() => router.reload()} />
              </Col>
            </Row>
            <ReactTable columns={columns} data={data} />
          </>
        )}
      </div>
    </div>
  );
};

export default EditCsv;
