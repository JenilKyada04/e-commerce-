import { User } from "../app/types";
import Image from "next/image";

type UserListProps = {
  users: User[];
};

const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="rounded-xl bg-white p-4 sm:p-6 shadow">
      <h2 className="mb-4 text-lg sm:text-xl font-semibold">
        Recent Users
      </h2>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 sm:gap-4"
          >
            {/* <Image */}
            <img
              src={user.image || "/avatar-placeholder.png"}
              alt={user.firstName}
              // width={40}
              // height={40}
              className="h-10 w-10 rounded-full object-cover"
            />

            <div className="min-w-0">
              <p className="truncate font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="truncate text-sm text-gray-500">
                {user.email}
              </p>
            </div>
          </div>
        ))}

        {users.length === 0 && (
          <p className="py-8 text-center text-sm text-gray-400">
            No users found
          </p>
        )}
      </div>
    </div>
  );
};

export default UserList;
