<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SWP Calculator - Systematic Withdrawal Plan</title>
    <link rel="stylesheet" href="style.css"> <!-- Link to the CSS file -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        /* Additional styles can be added here if needed */
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>SWP Calculator</h1>
            <p>Plan your systematic withdrawals and ensure sustainable income</p>
        </div>

        <div class="main-content">
            <div class="input-section">
                <h2 class="section-title">Withdrawal Parameters</h2>
                
                <div class="input-group">
                    <label class="input-label">Total Investment (₹)</label>
                    <input type="number" id="totalInvestmentInput" class="input-field" min="100000" max="10000000" value="1000000" placeholder="Enter total investment">
                </div>

                <div class="input-group">
                    <label class="input-label">Monthly Withdrawal (₹)</label>
                    <input type="number" id="monthlyWithdrawalInput" class="input-field" min="5000" max="200000" value="10000" placeholder="Enter monthly withdrawal">
                </div>

                <div class="input-group">
                    <label class="input-label">Expected Rate of Return (% P.A.)</label>
                    <input type="number" id="returnRateInput" class="input-field" min="1" max="25" value="8" step="0.5" placeholder="Enter expected return">
                </div>

                <div class="input-group">
                    <label class="input-label">Number of Years</label>
                    <input type="number" id="numberOfYearsInput" class="input-field" min="1" max="50" value="20" placeholder="Enter withdrawal period">
                </div>

                <div class="info-note">
                    <strong>💡 SWP Benefits:</strong> Regular income, tax efficiency, and flexibility to adjust withdrawals based on market conditions
                </div>
            </div>

            <div class="output-section">
                <div class="results-container">
                    <h2 class="results-title">Withdrawal Analysis</h2>
                    <div id="resultsContent" class="fade-in">
                        <!-- Results will be displayed here -->
                    </div>
                </div>

                <div class="chart-container">
                    <canvas id="swpChart"></canvas>
                </div>
            </div>
        </div>
    </div>

    <script>
        let chart;

        // Sync inputs with calculations
        function syncInputs() {
            const totalInvestmentInput = document.getElementById('totalInvestmentInput');
            const monthlyWithdrawalInput = document.getElementById('monthlyWithdrawalInput');
            const returnRateInput = document.getElementById('returnRateInput');
            const numberOfYearsInput = document.getElementById('numberOfYearsInput');

            totalInvestmentInput.addEventListener('input', calculateSWP);
            monthlyWithdrawalInput.addEventListener('input', calculateSWP);
            returnRateInput.addEventListener('input', calculateSWP);
            numberOfYearsInput.addEventListener('input', calculateSWP);
        }

        // Calculate SWP
        function calculateSWP() {
            const initialInvestment = parseFloat(document.getElementById('totalInvestmentInput').value) || 0;
            const monthlyWithdrawal = parseFloat(document.getElementById('monthlyWithdrawalInput').value) || 0;
            const annualRate = parseFloat(document.getElementById('returnRateInput').value) || 0;
            const years = parseFloat(document.getElementById('numberOfYearsInput').value) || 0;

            const monthlyRate = annualRate / 12 / 100;
            const totalMonths = years * 12;
            const totalWithdrawals = monthlyWithdrawal * totalMonths;

            let balance = initialInvestment;
            let totalReturns = 0;
            let monthsToExhaust = 0;
            let balanceHistory = [balance];

            for (let month = 1; month <= totalMonths; month++) {
                const monthlyReturn = balance * monthlyRate;
                balance += monthlyReturn;
                totalReturns += monthlyReturn;
                balance -= monthlyWithdrawal;
                balanceHistory.push(Math.max(0, balance));

                if (balance <= 0 && monthsToExhaust === 0) {
                    monthsToExhaust = month;
                }
            }

            const remainingBalance = Math.max(0, balance);
            const withdrawalRate = (monthlyWithdrawal * 12 / initialInvestment) * 100;
            const yearsToExhaust = monthsToExhaust > 0 ? (monthsToExhaust / 12).toFixed(1) : 'Never';

            updateResults({
                totalWithdrawals,
                remainingBalance,
                totalReturns,
                withdrawalRate,
                yearsToExhaust,
                balanceHistory
            });

            updateChart(balanceHistory, years);
        }

        function updateResults(data) {
            const resultsContent = document.getElementById('resultsContent');
            resultsContent.innerHTML = `
                <div class="result-card">
                    <div class="result-main">
                        <div class="result-main-label">Total Withdrawals</div>
                        <div class="result-main-value">${formatCurrency(data.totalWithdrawals)}</div>
                    </div>
                    <div class="result-main">
                        <div class="result-main-label">Remaining Balance</div>
                        <div class="result-main-value">${formatCurrency(data.remainingBalance)}</div>
                    </div>
                    <div class="result-main">
                        <div class="result-main-label">Total Returns</div>
                        <div class="result-main-value">${formatCurrency(data.totalReturns)}</div>
                    </div>
                    <div class="result-main">
                        <div class="result-main-label">Withdrawal Rate</div>
                        <div class="result-main-value">${data.withdrawalRate.toFixed(1)}%</div>
                    </div>
                    <div class="result-main">
                        <div class="result-main-label">Years to Exhaust</div>
                        <div class="result-main-value">${data.yearsToExhaust}</div>
                    </div>
                </div>
            `;
        }

        function updateChart(balanceHistory, years) {
            const ctx = document.getElementById('swpChart').getContext('2d');
            if (chart) {
                chart.destroy();
            }

            chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: Array.from({ length: balanceHistory.length }, (_, i) => i),
                    datasets: [{
                        label: 'Balance Over Time',
                        data: balanceHistory,
                        borderColor: '#42a5f5',
                        fill: false,
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Months'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Balance (₹)'
                            }
                        }
                    }
                }
            });
        }

        function formatCurrency(amount) {
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
            }).format(amount);
        }

        document.addEventListener('DOMContentLoaded', function() {
            syncInputs();
            calculateSWP();
        });
    </script>
</body>
</html>