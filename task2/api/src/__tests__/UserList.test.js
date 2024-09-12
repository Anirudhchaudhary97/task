import React from 'react'; // Add this import

import { render, screen, waitFor } from "@testing-library/react";
import UserList from "../components/userslist/UserList";
// import "@testing-library/jest-dom/extend-expect";
import '@testing-library/jest-dom';


// Mock the fetch function globally
global.fetch = jest.fn();

describe("UserList Component", () => {
  // Clear any previous mock data before each test
  beforeEach(() => {
    fetch.mockClear();
  });

  test("displays loading state initially", () => {
    // Render the component
    render(<UserList />);

    // Check that the loading message is shown
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders user list after fetching data successfully", async () => {
    // Mock the fetch API to return a successful response with user data
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          phone: "123-456-7890",
          website: "johndoe.com",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          phone: "987-654-3210",
          website: "janesmith.com",
        },
      ],
    });

    // Render the component
    render(<UserList />);

    // Wait for the users to be displayed after data is fetched
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    });

    // Verify that user details are displayed correctly
    expect(screen.getByText("Email: john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Phone: 123-456-7890")).toBeInTheDocument();
  });


  test("shows error message when the fetch fails", async () => {
    // Mock the fetch API to throw an error
    fetch.mockRejectedValueOnce(new Error("Failed to fetch"));
  
    // Render the component
    render(<UserList />);
  
    // Wait for the error message to be displayed
    await waitFor(() => {
      // Use a function for the text matcher to account for split text
      expect(screen.getByText((content, element) => 
        content.includes("Error:") && content.includes("Failed to fetch")
      )).toBeInTheDocument();
    })
  })
});
