import { useState } from 'react';

const initialFriends = [
  {
    id: 118836,
    name: 'Clark',
    image: 'https://i.pravatar.cc/48?u=118836',
    balance: -7,
  },
  {
    id: 933372,
    name: 'Sarah',
    image: 'https://i.pravatar.cc/48?u=933372',
    balance: 20,
  },
  {
    id: 499476,
    name: 'Anthony',
    image: 'https://i.pravatar.cc/48?u=499476',
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setshowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setshowAddFriend(show => !show);
  }

  function handleAddFriend(newFriend) {
    setFriends(friends => [...friends, newFriend]);
    setshowAddFriend(show => !show);
  }

  function handleSelected(friend) {
    setSelectedFriend(cur => (cur?.id === friend.id ? null : friend));
    setshowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends(friends =>
      friends.map(friend =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelected}
        />

        {showAddFriend && <AddFriendForm onAddFriend={handleAddFriend} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? 'Close' : 'Add Friend'}
        </Button>
      </div>

      {selectedFriend && (
        <SplitBillForm
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <>
      <ul>
        {friends.map(friend => (
          <Friend
            friend={friend}
            key={friend.id}
            onSelection={onSelection}
            selectedFriend={selectedFriend}
          />
        ))}
      </ul>
    </>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = friend.id === selectedFriend?.id;
  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          You friend {friend.name} owes you {friend.balance}$
        </p>
      )}
      {friend.balance === 0 && (
        <p className="">You and {friend.name} are even</p>
      )}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? 'Close' : 'Select'}
      </Button>
    </li>
  );
}

function AddFriendForm({ onAddFriend }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  function handleFormSubmit(e) {
    e.preventDefault();
    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    console.log(newFriend);
    onAddFriend(newFriend);

    setName('');
    setImage('https://i.pravatar.cc/48');
  }

  return (
    <form className="form-add-friend" onSubmit={handleFormSubmit}>
      <label>😉Friend name</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />

      <label>🎃Image URL</label>
      <input
        type="text"
        value={image}
        onChange={e => setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}

function SplitBillForm({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState('');
  const [userExpense, setUserExpense] = useState('');
  const [paidBy, setPaidBy] = useState('user');

  const friendExpense = bill ? bill - userExpense : '';

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!bill || !userExpense) return;

    onSplitBill(paidBy === 'user' ? friendExpense : -userExpense);
  }
  return (
    <form className="form-split-bill" onSubmit={handleFormSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={e => setBill(Number(e.target.value))}
      />

      <label>🤦‍♂️ Your Expense</label>
      <input
        type="text"
        value={userExpense}
        onChange={e =>
          setUserExpense(
            Number(e.target.value) > bill ? userExpense : Number(e.target.value)
          )
        }
      />

      <label>💂‍♂️ {selectedFriend.name}'s expense</label>
      <input type="text" value={friendExpense} disabled readOnly />

      <label>💰 Who is paying the bill?</label>
      <select value={paidBy} onChange={e => setPaidBy(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
