import { User } from "../app/types/index";

type UserListProps = {
  users: User[];
};

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">👥 Recent Users</h2>

      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center gap-3">
            <img
              src={user.image}
              alt={user.firstName}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        ))}

        {users.length === 0 && (
          <p className="text-center text-gray-400">No users found</p>
        )}
      </div>
    </div>
  );
};

export default UserList;
