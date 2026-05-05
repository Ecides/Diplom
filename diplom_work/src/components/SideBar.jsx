function Sidebar({ selectedCategory, setCategory }) {
  return (
    <aside style={{ width: '250px', padding: '20px', borderRight: '1px solid #ccc' }}>
      <h3>Filters</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>
          <input 
            type="radio" 
            checked={selectedCategory === 'all'} 
            onChange={() => setCategory('all')} 
          /> All
        </label>
        <label>
          <input 
            type="radio" 
            checked={selectedCategory === 'electronics'} 
            onChange={() => setCategory('electronics')} 
          /> Electronics
        </label>
        <label>
          <input 
            type="radio" 
            checked={selectedCategory === 'furniture'} 
            onChange={() => setCategory('furniture')} 
          /> Furniture
        </label>
      </div>
    </aside>
  );
}

export default Sidebar;