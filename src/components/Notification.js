const Notification = ({ notification }) => {
  if (notification === null) return null;

  const getIcon = (type) => {
    switch (type) {
      case "error":
        return "X";
      case "warning":
        return "!";
      case "information":
        return "i";
      default:
        return "";
    }
  };

  return (
    <div className={`notification ${notification.type}`}>
      <span className="icon">{getIcon(notification.type)}</span>
      <span className="message">{notification.message}</span>
    </div>
  );
};

export default Notification;
