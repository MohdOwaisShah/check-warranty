import React, { useState } from 'react';
import '../styles/WarrantyChecker.css';

const WarrantyChecker = () => {
  const [startDate, setStartDate] = useState('');
  const [warrantyPeriod, setWarrantyPeriod] = useState('');
  const [warrantyData, setWarrantyData] = useState(null);
  const [showMonthsGuide, setShowMonthsGuide] = useState(false);

  const calculateWarranty = () => {
    if (!startDate || !warrantyPeriod) {
      alert('Please select both start date and warranty period');
      return;
    }

    const start = new Date(startDate);
    const endDate = new Date(start);
    
    // Calculate end date based on warranty period
    switch (warrantyPeriod) {
      case '3month':
        endDate.setMonth(endDate.getMonth() + 3);
        break;
      case '6month':
        endDate.setMonth(endDate.getMonth() + 6);
        break;
      case '1year':
        endDate.setFullYear(endDate.getFullYear() + 1);
        break;
      default:
        break;
    }

    const today = new Date();
    const isActive = today <= endDate;

    // Format dates with month names
    const formatDateWithMonth = (date) => {
      return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    };

    setWarrantyData({
      startDate: formatDateWithMonth(start),
      endDate: formatDateWithMonth(endDate),
      isActive,
      daysRemaining: isActive 
        ? Math.ceil((endDate - today) / (1000 * 60 * 60 * 24))
        : 0
    });
  };

  const resetForm = () => {
    setStartDate('');
    setWarrantyPeriod('');
    setWarrantyData(null);
    setShowMonthsGuide(false);
  };

  const toggleMonthsGuide = () => {
    setShowMonthsGuide(!showMonthsGuide);
  };

  const monthsList = [
    { number: '01', name: 'January' },
    { number: '02', name: 'February' },
    { number: '03', name: 'March' },
    { number: '04', name: 'April' },
    { number: '05', name: 'May' },
    { number: '06', name: 'June' },
    { number: '07', name: 'July' },
    { number: '08', name: 'August' },
    { number: '09', name: 'September' },
    { number: '10', name: 'October' },
    { number: '11', name: 'November' },
    { number: '12', name: 'December' }
  ];

  return (
    <div className="warranty-container">
      <div className="warranty-card">
        <h1 className="title">🔧 Warranty Checker</h1>
        <p className="subtitle">Check your product warranty status</p>
        
        {/* Month Reference Button */}
        <div className="month-guide-container">
          <button 
            onClick={toggleMonthsGuide}
            className="month-guide-btn"
          >
            📅 Month Reference Guide
          </button>
          
          {showMonthsGuide && (
            <div className="months-guide">
              <h4>Month Reference Guide</h4>
              <div className="months-grid">
                {monthsList.map(month => (
                  <div key={month.number} className="month-item">
                    <span className="month-number">{month.number}</span>
                    <span className="month-name">{month.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="form-container">
          <div className="input-group">
            <label htmlFor="startDate">Purchase Date</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="date-input"
            />
          </div>

          <div className="input-group">
            <label htmlFor="warrantyPeriod">Warranty Period</label>
            <select
              id="warrantyPeriod"
              value={warrantyPeriod}
              onChange={(e) => setWarrantyPeriod(e.target.value)}
              className="select-input"
            >
              <option value="">Select warranty period</option>
              <option value="3month">3 Months</option>
              <option value="6month">6 Months</option>
              <option value="1year">1 Year</option>
            </select>
          </div>

          <div className="button-group">
            <button 
              onClick={calculateWarranty}
              className="btn btn-primary"
            >
              Check Warranty
            </button>
            <button 
              onClick={resetForm}
              className="btn btn-secondary"
            >
              Reset
            </button>
          </div>
        </div>

        {warrantyData && (
          <div className="result-container">
            <div className="result-card">
              <div className="status-header">
                <div className={`status-dot ${warrantyData.isActive ? 'active' : 'expired'}`}></div>
                <h3 className="status-title">
                  Warranty {warrantyData.isActive ? 'Active' : 'Expired'}
                </h3>
              </div>
              
              <div className="warranty-details">
                <div className="detail-item">
                  <span className="detail-label">Start Date:</span>
                  <span className="detail-value">{warrantyData.startDate}</span>
                </div>
                
                <div className="detail-item">
                  <span className="detail-label">End Date:</span>
                  <span className="detail-value">{warrantyData.endDate}</span>
                </div>
                
                {warrantyData.isActive && (
                  <div className="detail-item">
                    <span className="detail-label">Days Remaining:</span>
                    <span className="detail-value highlight">
                      {warrantyData.daysRemaining} days
                    </span>
                  </div>
                )}
              </div>
              
              <div className={`status-message ${warrantyData.isActive ? 'active' : 'expired'}`}>
                {warrantyData.isActive 
                  ? '🎉 Your product is under warranty!'
                  : '⚠️ Your warranty has expired. Consider extended coverage.'
                }
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WarrantyChecker;