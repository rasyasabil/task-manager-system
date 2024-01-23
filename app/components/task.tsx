"use client";

import { ITask } from "@/types/tasks"
import { FormEventHandler, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
    task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    })
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDelete(false);
    router.refresh();
  }  

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <FiEdit onClick={() => setOpenModalEdit(true)} className="cursor-pointer" size={20} />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
            <form onSubmit={handleSubmitEditTodo}>
              <h3 className="font-bold text-lg text-white">Edit task</h3>
              <div className="modal-action">
              <input 
                value={taskToEdit}
                onChange={e => setTaskToEdit(e.target.value)}
                type="text" 
                placeholder="Type here" 
                className="input input-bordered w-full max-w-xs" 
              />
              <button type="submit" className="btn" >submit</button>
              </div>
            </form>
          </Modal>
        <FiTrash2 onClick={() => setOpenModalDelete(true)} className="cursor-pointer"  size={20} />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDelete}>
            <h3 className="text-lg">Apa kamu yakin, ingin menghapus ini?</h3>
            <div className="modal-action">
              <button
              onClick={() => handleDeleteTask(task.id)}
              className="btn"
              >
              yes</button>
            </div>
        </Modal>
      </td>
    </tr>
  )
}

export default Task