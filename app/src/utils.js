import { getDatabase, ref, push, get, remove, update } from "firebase/database";
import dayjs from "dayjs";
const stateStyle = {
  active: "info",
  done: "success",
  expired: "danger",
};
const stateInfo = {
  active: "В работе",
  done: "Выполнено",
  expired: "Время вышло",
};

const addTaskToFirebase = async (task) => {
  const { userID } = task;
  const dataBase = getDatabase();

  try {
    push(ref(dataBase, `users/${userID}`), task);
  } catch (e) {
    console.log(e);
  }
};

const deleteTaskFromFirebase = async (task) => {
  const { id, userID } = task;
  const dataBase = getDatabase();
  const taskRef = ref(dataBase, `users/${userID}/${id}`);
  remove(taskRef);
};

const getNewTask = async (userID) => {
  const dataBase = getDatabase();
  const usersRef = ref(dataBase, `users/${userID}`);

  return get(usersRef).then((snapshot) => {
    const snapValue = snapshot.val();
    const entries = Object.entries(snapValue);
    const length = entries.length;
    const [id, data] = entries[length - 1];

    const newTask = { id, ...data };
    return newTask;
  });
};

const getTasks = async (userID) => {
  const dataBase = getDatabase();
  const tasksRef = ref(dataBase, `users/${userID}`);

  return get(tasksRef).then((snapshot) => {
    if (snapshot.val()) {
      return snapshot.val();
    } else {
      return {};
    }
  });
};

const updateTask = async (ids, changes) => {
  const { id, userID } = ids;
  const dataBase = getDatabase();
  const updates = {};
  updates[`/users/${userID}/${id}`] = changes;
  update(ref(dataBase), updates);
};

const getTimeDiff = (start, end) => {
  
  if (end !== "notStated") {
    const startFormatted = dayjs(start.split("/").reverse().join("-"));

    const endFormatted = dayjs(end.split("/").reverse().join("-"));
    
    const diff = dayjs(startFormatted).diff(dayjs(endFormatted));

    return diff;
  } else {
    return end;
  }
};

const getDates = (finishDate) => {
  
  const startDate = dayjs();
  const endDate = finishDate.length !== 0 ? dayjs(finishDate) : "notStated";

  const startFormatted = dayjs(startDate).format("DD/MM/YYYY");
  const endFormatted =
    endDate !== "notStated" ? dayjs(endDate).format("DD/MM/YYYY") : endDate;

  return {
    start: startDate,
    startFormatted,
    end: endDate,
    endFormatted,
  };
};

export { stateInfo, stateStyle };
export { getTimeDiff, getDates };
export {
  addTaskToFirebase,
  deleteTaskFromFirebase,
  getTasks,
  getNewTask,
  updateTask,
};
