import Message from "../models/message.model.js";

export const getMessage = async (req, res) => {
  try {
    const { from, to } = req.body;
    const data = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });
    const projectedMessages = data.map((msg) => {
      return {
        id: msg._id,
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data)
      return res.json({ msg: "Message added successfully.", id: data._id });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Message.findByIdAndDelete(id);
    if (data)
      return res.status(200).json({ msg: "Message deleted successfully." });
    else return res.json({ msg: "Failed to delete message from the database" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
