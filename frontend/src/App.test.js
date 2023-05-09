import { render, screen, waitFor } from "@testing-library/react";
// import { render, fireEvent, cleanup } from "@testing-library/react";
import ReactDOM from "react-dom";
import MainContent from "../src/components/MainContent";
import Header from "../src/components/Header";
import Update from "./components/Update";
import AxiosMock from "axios";
import { BrowserRouter } from "react-router-dom";

// Unit testing for header
describe("Testing header page", () => {
  beforeEach(() => {
    console.log("executes before every test for main content");
  });

  it("async axios request of main content for logo", async () => {
    const { getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(getByText(/logo/).textContent).toBe("logo");
  });

  it("async axios request of main content for project name", async () => {
    const { getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(getByText(/Project Name/).textContent).toBe("Project Name");
  });
});

//unit testing for main content
describe("Testing main content page", () => {
  beforeEach(() => {
    console.log("executes before every test for main content");
  });

  it("async axios request of main centent for welcome text", async () => {
    AxiosMock.get.mockResolvedValue({ data: {} });

    const url = "http://localhost:8080/api/tutorials";

    const { getByText } = render(
      <BrowserRouter>
        <MainContent url={url} />
      </BrowserRouter>
    );

    expect(getByText(/all models/).textContent).toBe("all models");

    expect(AxiosMock.get).toHaveBeenCalledTimes(1);

    expect(AxiosMock.get).toHaveBeenCalledWith(url);
  });

  it("async axios request of main content for create button", async () => {
    AxiosMock.get.mockResolvedValue({ data: {} });

    const url = "http://localhost:8080/api/tutorials";

    const { getByTestId } = render(
      <BrowserRouter>
        <MainContent url={url} />
      </BrowserRouter>
    );

    const resolveElement = await waitFor(() => getByTestId("createbtn"));

    expect(resolveElement.textContent).toBe("create");

    expect(AxiosMock.get).toHaveBeenCalledTimes(1);

    expect(AxiosMock.get).toHaveBeenCalledWith(url);
  });

  it("async axios request of main content for no button", async () => {
    AxiosMock.get.mockResolvedValue({ data: {} });

    const url = "http://localhost:8080/api/tutorials";

    const { getByTestId } = render(
      <BrowserRouter>
        <MainContent url={url} />
      </BrowserRouter>
    );

    const resolveElement = await waitFor(() => getByTestId("nobtn"));

    expect(resolveElement.textContent).toBe("No");

    expect(AxiosMock.get).toHaveBeenCalledTimes(1);

    expect(AxiosMock.get).toHaveBeenCalledWith(url);
  });

  it("async axios request of main content for yes button", async () => {
    AxiosMock.get.mockResolvedValue({ data: {} });

    const url = "http://localhost:8080/api/tutorials";

    const { getByTestId } = render(
      <BrowserRouter>
        <MainContent url={url} />
      </BrowserRouter>
    );

    const resolveElement = await waitFor(() => getByTestId("yesbtn"));

    expect(resolveElement.textContent).toBe("Yes");

    expect(AxiosMock.get).toHaveBeenCalledTimes(1);

    expect(AxiosMock.get).toHaveBeenCalledWith(url);
  });
});

//testing of update page
describe("Testing update page", () => {
  beforeEach(() => {
    console.log("executes before every test for main content");
  });

  // it("async axios request of update text", async () => {
  //   AxiosMock.get.mockResolvedValue({ data: {} });

  //   const url = "http://localhost:8080/api/tutorials";

  //   const { getByText } = render(
  //     <BrowserRouter>
  //       <Update url={url} />
  //     </BrowserRouter>
  //   );

  //   expect(getByText(/create \/ update model/).textContent).toBe(
  //     "create / update model"
  //   );

  // const resolveElement = await waitFor(() => getByText());

  //   expect(AxiosMock.get).toHaveBeenCalledTimes(1);

  //   expect(AxiosMock.get).toHaveBeenCalledWith(url);
  // });

  it("async axios request of input text", async () => {
    AxiosMock.get.mockResolvedValue({ data: {} });

    const url = "http://localhost:8080/api/tutorials/undefined";

    const { getByText } = render(
      <BrowserRouter>
        <Update url={url} />
      </BrowserRouter>
    );

    expect(getByText(/Name* :/).textContent).toBe("Name* :");

    expect(AxiosMock.get).toHaveBeenCalledTimes(1);

    expect(AxiosMock.get).toHaveBeenCalledWith(url);
  });
});
