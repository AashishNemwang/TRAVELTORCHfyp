const Table = ({ children, className }) => {
    return (
      <table className={`w-full border-collapse border border-gray-300 ${className}`}>
        {children}
      </table>
    );
  };
  
  const Thead = ({ children }) => (
    <thead className="bg-gray-200">
      {children}
    </thead>
  );
  
  const Tbody = ({ children }) => <tbody>{children}</tbody>;
  
  const Tr = ({ children }) => (
    <tr className="border-b border-gray-300">{children}</tr>
  );
  
  const Th = ({ children }) => (
    <th className="p-2 border border-gray-300 text-left">{children}</th>
  );
  
  const Td = ({ children }) => (
    <td className="p-2 border border-gray-300">{children}</td>
  );
  
  export { Table, Thead, Tbody, Tr, Th, Td };
  