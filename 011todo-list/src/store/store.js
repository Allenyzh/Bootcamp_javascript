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

      // 输入框
      // 数据
      title: "",
      description: "",
      // 方法
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
          return {}; // 如果输入框为空，状态不更新
        }),
    }),
    {
      name: "todolist-storage",
    }
  )
);
