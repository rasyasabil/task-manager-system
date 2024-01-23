import { getAllTodos } from '@/api'
import AddTask from './components/AddTask'
import TodoList from './components/TodoList'

export default async function Home() {
  const tasks = await getAllTodos();
  console.log(tasks);

  return (
    <main className='max-w-4xl mx-auto mt-4'>
      <div className='text-center my-5 flexflex-col gap-4'>
        <h1 className='text-2xl font-bold'>Jurnal Harian PKL</h1>
        <AddTask />
      </div>
      <TodoList tasks={tasks}/>
    </main>
  )
}
