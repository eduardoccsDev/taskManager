import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Task Manager", () => {
  test("adiciona uma nova tarefa", async () => {
    render(<App />);

    // encontra o input
    const input = screen.getByPlaceholderText(/nova tarefa/i);

    // digita e pressiona Enter
    await userEvent.type(input, "Estudar React{enter}");

    // verifica se a tarefa foi adicionada
    expect(screen.getByText("Estudar React")).toBeInTheDocument();
  });
});
