import React, { useState } from "react";
import { SearchBar } from "../../components/common/SearchBar";
import { Pagination } from "../../components/common/Pagination";

export const DataTable = ({
  columns = [],
  data = [],
  searchable = true,
  searchPlaceholder = "Search table...",
  actions,
  pageSize = 6
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((row) => {
    if (!searchQuery) return true;
    return Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="bg-white rounded-2xl border border-[#E5DED5] shadow-xs overflow-hidden flex flex-col">
      {searchable && (
        <div className="p-4 sm:p-6 border-b border-[#E5DED5] bg-[#F1EEE9]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <SearchBar
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              setCurrentPage(1);
            }}
            placeholder={searchPlaceholder}
          />
          <span className="text-xs text-[#8A837C] font-light">
            Showing {filteredData.length} records
          </span>
        </div>
      )}

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F1EEE9] text-[#26221F] uppercase text-[11px] tracking-wider font-semibold border-b border-[#E5DED5]">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4">
                  {col.header}
                </th>
              ))}
              {actions && <th className="px-6 py-4 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5DED5]">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIdx) => (
                <tr key={row.id || rowIdx} className="hover:bg-[#F7F5F2] transition-colors">
                  {columns.map((col, colIdx) => (
                    <td key={colIdx} className="px-6 py-4 font-normal text-[#26221F]">
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4 text-right space-x-2">
                      {actions(row)}
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="px-6 py-12 text-center text-[#8A837C] font-light"
                >
                  No records match your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination */}
      <div className="p-4 border-t border-[#E5DED5] bg-[#F1EEE9]/30 flex items-center justify-between">
        <span className="text-xs text-[#8A837C]">
          Page {currentPage} of {totalPages}
        </span>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

