/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "regenerator-runtime/runtime";
import CoursePage from "../../components/CoursePage.js";
import MockUtils from "../utils/MockUtils";

MockUtils.Alert.enable("error");
MockUtils.Console.enable({ log: "silent", error: "error" });
MockUtils.Fetch.enable();

beforeAll(() => {
  delete window.location; //TODO: https://remarkablemark.org/blog/2018/11/17/mock-window-location/
  window.location = { reload: jest.fn() };
});

describe("CoursePage", () => {
  test("loading", async () => {
    fetch.mockResponseValue({
      course: { code: "code", name: "Name" },
      tutors: [],
    });
    await waitFor(async () => {
      const component = render(
        <CoursePage profile={null} setProfile={jest.fn()} />,
        { wrapper: MemoryRouter }
      );
      const loadingContainer =
        component.container.querySelector(".loadingContainer");
      expect(loadingContainer).not.toBe(null);
    });
  });

  describe("tutors", () => {
    test.each`
      name          | tutors
      ${"empty"}    | ${[]}
      ${"single"}   | ${[{ username: "Username" }]}
      ${"multiple"} | ${[{ username: "First" }, { username: "Second" }, { username: "Third" }]}
    `("$name", async ({ tutors }) => {
      fetch.mockResponseValue({
        course: { code: "code", name: "Name" },
        tutors: tutors.map((t) => createTutor(t)),
      });
      const component = await waitFor(async () => {
        return render(<CoursePage profile={null} setProfile={jest.fn()} />, {
          wrapper: MemoryRouter,
        });
      });
      const tutorlist = component.queryByTitle("tutorlist");
      if (tutors.length === 0) {
        expect(tutorlist).toHaveTextContent("No Tutors Available");
      } else {
        expect(tutorlist.children).toHaveLength(tutors.length);
      }
    });
  });

  //TODO: Availability

  describe("patch course", () => {
    test.each`
      name        | tutors                        | add
      ${"add"}    | ${[]}                         | ${true}
      ${"remove"} | ${[{ username: "Username" }]} | ${false}
    `("$name", async ({ tutors, add }) => {
      fetch.mockResponseValueOnce({
        course: { code: "code", name: "Name" },
        tutors: tutors.map((t) => createTutor(t)),
      });
      fetch.mockResponseValue({});
      const setProfile = jest.fn();
      const component = await waitFor(async () => {
        return render(
          <MemoryRouter initialEntries={["/courses/code"]}>
            <Routes>
              <Route
                path={"/courses/:code"}
                element={
                  <CoursePage
                    profile={createTutor({ username: "Username" })}
                    setProfile={setProfile}
                  />
                }
              />
            </Routes>
          </MemoryRouter>
        );
      });
      await waitFor(async () => {
        const button = component.queryByTitle(
          add ? "addbutton" : "removebutton"
        );
        fireEvent.click(button);
      });
      expect(fetch).toHaveBeenCalledWith(
        "/profile",
        expect.objectContaining({
          method: "PATCH",
          body: JSON.stringify({ tutoring: [{ code: "code", action: add }] }),
        })
      );
      expect(setProfile).toHaveBeenCalled();
    });
  });
});

function createTutor({
  username,
  firstname = "",
  lastname = "",
  email = "",
  phone = "",
  bio = "",
  rating = 0.0,
  availability = [],
}) {
  return {
    username,
    firstname,
    lastname,
    email,
    phone,
    bio,
    rating,
    availability,
  };
}
