import Notification from "../models/notification.model.js";

export const getNotfications = async (req, res) => {

    const user = req.user;

    try {

        if (!user) return res.status(401).json({ error: "You need to login first." });

        const notifications = await Notification.find({ to: user._id })
            .populate({
                path: "from",
                select: "username profileImg"
            });

        await Notification.updateMany({ to: user._id }, { $set: { read: true } });

        res.status(200).json(notifications);

    } catch (error) {
        console.log("Error in getNotfications function", error.message);
        res.status(500).json({ error: "Internal server error." });
    }

};

export const deleteNotification = async (req, res) => {

    const userId = req.user._id;

    try {

        await Notification.deleteMany({ to: userId });

        res.status(200).json({ message: "Notifications deleted successfully." });

    } catch (error) {
        console.log("Error in deleteNotification function", error.message);
        res.status(500).json({ error: "Internal server error." });
    }
};

export const deleteOneNotification = async (req, res) => {

    const userId = req.user._id;

    try {

        const notification = await Notification.findById(req.params.id);

        if (!notification) return res.status(404).json({ error: "Notification not found." });

        if (notification.to.toString() !== userId.toString()) return res.status(403).json({ error: "You are not authorized to delete this notification." });

        await Notification.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Notification deleted successfully." });

    } catch (error) {
        console.log("Error in deleteOneNotification function", error.message);
        res.status(500).json({ error: "Internal server error." });
    }

}