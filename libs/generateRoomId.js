const uuid = require('uuid');

function generateChatRoomId(user1Id, user2Id) {
  
  const sortedUserIds = [user1Id, user2Id].sort();
  
  const uniqueId = uuid.v5(sortedUserIds.join('-'), uuid.v5.DNS);

  return uniqueId.slice(0,15);
}

export default generateChatRoomId;