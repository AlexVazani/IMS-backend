import Schedule from "../models/Schedule.js";

// Schedule
export const getSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.find();

    res.status(200).json(schedule);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addSchedule = async (req, res) => {
  try {
    const data = req.body;

    const newSchedule = new Schedule(data);
    await newSchedule.save();

    res
      .status(201)
      .json({ message: "새 스케쥴이 생성되었습니다!", schedule: newSchedule });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const newSchedule = await Schedule.findByIdAndUpdate(
      id,
      {
        scheduleTitle: data.title,
        scheduleStart: data.start,
        scheduleEnd: data.end,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res
      .status(201)
      .json({ message: "스케쥴이 수정되었습니다!", schedule: newSchedule });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;

    await Schedule.findByIdAndDelete(id);

    res.status(201).json({ message: "스케쥴이 삭제되었습니다!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
