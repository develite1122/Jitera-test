import '@testing-library/jest-dom/extend-expect';
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { App } from "./App";
import { render } from "./test-utils";

const dummyData = [
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret",
    "email": "Sincere@april.biz",
    "address": {
      "street": "Kulas Light",
      "suite": "Apt. 556",
      "city": "Gwenborough",
      "zipcode": "92998-3874",
      "geo": {
        "lat": "-37.3159",
        "lng": "81.1496"
      }
    },
    "phone": "1-770-736-8031 x56442",
    "website": "hildegard.org",
    "company": {
      "name": "Romaguera-Crona",
      "catchPhrase": "Multi-layered client-server neural-net",
      "bs": "harness real-time e-markets"
    }
  }
];

describe("<App />", () => {
  let originFetch: any;
  beforeEach(() => {
    originFetch = (global as any).fetch;
    const fakeResponse = dummyData;
    const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
    const mockedFetch = jest.fn().mockResolvedValueOnce(mRes as any);
    (global as any).fetch = mockedFetch;
  });
  afterEach(() => {
    (global as any).fetch = originFetch;
  });

  it("Render userlist successfully", async () => {
    render(<App />)
    const elements = await waitFor(async () => await screen.findAllByTestId('user-name'));
    expect(elements[0].textContent).toBe("Leanne Graham");
  })

  it("Has like/unlike, edit, delete buttons", async () => {
    render(<App />)
    const buttonLike = await waitFor(async () => await screen.getByTestId('button-user-like'));
    expect(buttonLike).toBeInTheDocument();
    const buttonEdit = await waitFor(async () => await screen.getByTestId('button-user-edit'));
    expect(buttonEdit).toBeInTheDocument();
    const buttonDelete = await waitFor(async () => await screen.getByTestId('button-user-delete'));
    expect(buttonDelete).toBeInTheDocument();
  })

  it("Like/unlike works", async () => {
    render(<App />)
    const buttonLike = await waitFor(async () => await screen.getByTestId('button-user-like'));
    fireEvent.click(buttonLike);
    expect(buttonLike.getAttribute('aria-label')).toBe('Unlike User');
  })

  it("delete user works", async () => {
    render(<App />)
    const buttonDelete = await waitFor(async () => await screen.getByTestId('button-user-delete'));
    fireEvent.click(buttonDelete);
    const buttonConfirm = await waitFor(async () => await screen.getByTestId('confirm-ok'));
    fireEvent.click(buttonConfirm);
    const users = screen.queryAllByTestId('user-name');
    expect(users.length).toBe(0);
  })

  it("edit modal validation works", async () => {
    const { getByText } = render(<App />)
    const buttonEdit = await waitFor(async () => await screen.getByTestId('button-user-edit'));
    fireEvent.click(buttonEdit);

    const emailInput = await waitFor(async () => await screen.getByTestId('email-input'));
    let event = { target: { value: "invalidate-email" } };
    fireEvent.change(emailInput, event);
    const phoneInput = await waitFor(async () => await screen.getByTestId('phone-input'));
    event = { target: { value: "" } };
    fireEvent.change(phoneInput, event);
    const websiteInput = await waitFor(async () => await screen.getByTestId('website-input'));
    event = { target: { value: "" } };
    fireEvent.change(websiteInput, event);

    expect(getByText(/Invalid email address/i)).toBeInTheDocument();
    expect(getByText(/Phone number is required/i)).toBeInTheDocument();
    expect(getByText(/Website is required/i)).toBeInTheDocument();
  })

  it("edit user works", async () => {
    const { getByText } = render(<App />)
    const buttonEdit = await waitFor(async () => await screen.getByTestId('button-user-edit'));
    fireEvent.click(buttonEdit);

    const emailInput = await waitFor(async () => await screen.getByTestId('email-input'));
    let event = { target: { value: "testuser@email.com" } };
    fireEvent.change(emailInput, event);
    const phoneInput = await waitFor(async () => await screen.getByTestId('phone-input'));
    event = { target: { value: "testphonenumber" } };
    fireEvent.change(phoneInput, event);
    const websiteInput = await waitFor(async () => await screen.getByTestId('website-input'));
    event = { target: { value: "testwebsite" } };
    fireEvent.change(websiteInput, event);

    const editInModal = await waitFor(async () => await screen.getByTestId('confirm-edit'));
    fireEvent.click(editInModal);
    expect(getByText(/testuser@email.com/i)).toBeInTheDocument();
    expect(getByText(/testphonenumber/i)).toBeInTheDocument();
    expect(getByText(/testwebsite/i)).toBeInTheDocument();
  })
})