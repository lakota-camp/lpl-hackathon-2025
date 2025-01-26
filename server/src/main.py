import json
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime

def load_and_process(file_path='./server/src/services/aws/cost_test.json'):
    with open(file_path, 'r') as file:
        data = json.load(file)

        processed_data = []

        for entry in data:

            start_date = entry['TimePeriod']['Start']

            if 'Total' in entry and entry['Total'] and 'UnblendedCost' in entry:
                total_cost = float(entry['Total']['UnblendedCost']['Amount'])
            else:
                # Sum up costs from Groups if Total is empty
                total_cost = 0
                for group in entry.get('Groups', []):
                    if 'Metrics' in group and 'UnblendedCost' in group['Metrics']:
                        total_cost += float(group['Metrics']['UnblendedCost']['Amount'])
            
            processed_data.append({
                'date': datetime.strptime(start_date, '%Y-%m-%d'),
                'cost': total_cost
            })

        df = pd.DataFrame(processed_data)

        df['month'] = df['date'].dt.strftime('%Y-%m')

        return df
    
def syn_transform(df):
    df['month'] = df['date'].dt.strftime('%Y-%m')
    
    # Create mask for all months except May 2024
    mask = df['month'] != '2024-05'
    
    # Scale values between 3-9 for all months except May 2024
    min_val, max_val = 3, 12
    df.loc[mask, 'cost'] = min_val + (max_val - min_val) * (
        (df.loc[mask, 'cost'] - df.loc[mask, 'cost'].min()) / 
        (df.loc[mask, 'cost'].max() - df.loc[mask, 'cost'].min())
    )
    
    return df
    
def analyze_monthly_cost(df):
        monthly_costs = df[df['cost'] > 0].groupby('month')['cost'].sum().reset_index()

        plt.figure(figsize=(12,6))
        plt.bar(monthly_costs['month'], monthly_costs['cost'])
        plt.title("LPL: AWS EC2 Monthly Expendatures")
        plt.xlabel("Month")
        plt.ylabel("Cost (in thousands of $USD)")
        plt.xticks(rotation=45)
        plt.tight_layout()
        
        plt.savefig('LPL_AWS_Costs.png')

        return monthly_costs


    
def main():
    df = load_and_process()
    scaled_df = syn_transform(df)
    monthly_costs = analyze_monthly_cost(df)

    monthly_costs.to_csv('./server/src/services/ec2_cost.csv', index=False)

    print("Monthly Cost Summary")
    print(monthly_costs.to_string(index=False))

if __name__ == "__main__":
    main()