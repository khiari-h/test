import { useState, useEffect, useCallback, useMemo } from 'react';

export const useResponsiveItemsPerPage = (items = [], initialConfig = {}) => {
 const defaultConfig = {
   mobile: 3,
   tablet: 4,
   desktop: 6
 };

 const config = { ...defaultConfig, ...initialConfig };
 const [currentPage, setCurrentPage] = useState(1);
 const [itemsPerPage, setItemsPerPage] = useState(config.desktop);

 const updateItemsPerPage = useCallback(() => {
   const width = window.innerWidth;

   if (width < 768) {
     setItemsPerPage(config.mobile);
   } else if (width < 1024) {
     setItemsPerPage(config.tablet);
   } else {
     setItemsPerPage(config.desktop);
   }
 }, [config]);

 useEffect(() => {
   updateItemsPerPage();
   
   window.addEventListener('resize', updateItemsPerPage);
   return () => window.removeEventListener('resize', updateItemsPerPage);
 }, [updateItemsPerPage]);

 const paginatedItems = useMemo(() => {
   const start = (currentPage - 1) * itemsPerPage;
   return items.slice(start, start + itemsPerPage);
 }, [items, currentPage, itemsPerPage]);

 const totalPages = Math.ceil(items.length / itemsPerPage);

 const renderPagination = useCallback(() => {
   if (totalPages <= 1) return null;

   return {
     currentPage,
     totalPages,
     setCurrentPage,
     hasPrevious: currentPage > 1,
     hasNext: currentPage < totalPages,
     onNext: () => setCurrentPage(page => Math.min(page + 1, totalPages)),
     onPrevious: () => setCurrentPage(page => Math.max(page - 1, 1)),
     onPageSelect: (page) => setCurrentPage(page)
   };
 }, [currentPage, totalPages]);

 return { 
   itemsPerPage,
   currentPage,
   setCurrentPage, 
   paginatedItems,
   totalPages,
   pagination: renderPagination()
 };
};