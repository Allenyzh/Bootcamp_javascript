import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTodoStore = create(
  persist(
    (set) => ({
      todolist: [
        {
          id: 1,
          title: "Learn React",
          description: "Learn React and build a todo list app",
        },
      ],

      // 增
      title: "",
      description: "",
      setTitle: (title) => set(() => ({ title })),
      setDescription: (description) => set(() => ({ description })),

      addTodolist: () =>
        set((state) => {
          if (state.title.trim() && state.description.trim()) {
            const newTodo = {
              id: Date.now(),
              title: state.title,
              description: state.description,
            };
            return {
              todolist: [...state.todolist, newTodo], // 更新 todo 列表
              title: "", // 清空输入框
              description: "",
            };
          }
          return {};
        }),

      // 改
      newTitle: "",
      newDescription: "",
      setNewTitle: (newTitle) => set(() => ({ newTitle })),
      setNewDescription: (newDescription) => set(() => ({ newDescription })),

      updateTodolist: (id) =>
        set((state) => {
          if (state.newTitle.trim() || state.newDescription.trim()) {
            return {
              todolist: state.todolist.map((todo) =>
                todo.id === id
                  ? {
                      ...todo,
                      title: state.newTitle.trim() || todo.title,
                      description:
                        state.newDescription.trim() || todo.description,
                    }
                  : todo
              ),
              newTitle: "", // 清空输入框
              newDescription: "",
            };
          }
          return {};
        }),
    }),
    {
      name: "todolist-storage",
    }
  )
);

 
