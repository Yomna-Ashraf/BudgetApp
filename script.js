class UI {
    constructor() {
      this.budgetFeedback = document.querySelector(".budget-feedback");
      this.expenseFeedback = document.querySelector(".expense-feedback");
      this.budgetForm = document.getElementById("budget-form");
      this.budgetInput = document.getElementById("budget-input");
      this.budgetAmount = document.getElementById("budget-amount");
      this.expenseAmount = document.getElementById("expense-amount");
      this.balance = document.getElementById("balance");
      this.balanceAmount = document.getElementById("balance-amount");
      this.expenseForm = document.getElementById("expense-form");
      this.expenseInput = document.getElementById("expense-input");
      this.amountInput = document.getElementById("amount-input");
      this.expenseList = document.getElementById("expense-list");
      this.expenseDiv = document.getElementById("show-expense-div");
      this.trashBtn = document.getElementById("trash");

      this.itemList = [];
      this.itemID = 0;
    }
    submitBudgetForm(){
        const value = this.budgetInput.value;
        if(value==='' || value < 0){
            this.budgetFeedback.classList.add("show-item");
            this.budgetFeedback.textContent="Value cannot be empty or negative";
            const self = this;
            setTimeout(function(){
                self.budgetFeedback.classList.remove("show-item");
            },4000);
        }
        else{
            this.budgetAmount.textContent=value;
            this.budgetAmount.style.color="green"
            this.budgetInput.value='';
            this.showBalance();
        }
    }
    showBalance(){
        const expense = this.totalExpense();
        const total = parseInt(this.budgetAmount.textContent)-expense;
        this.balanceAmount.textContent=total;
        if(total<0){
            this.balanceAmount.style.color="red"
            
        }
        else{
            this.balanceAmount.style.color="green"
        }
    }
    submitExpenseForm(){
        const expenseValue = this.expenseInput.value;
        const amountValue = this.amountInput.value;
        if(expenseValue==='' || amountValue==='' || amountValue < 0){
            this.expenseFeedback.classList.add("show-item");
            this.expenseFeedback.textContent="Value cannot be empty or negative";
            const self = this;
            setTimeout(function(){
                self.expenseFeedback.classList.remove("show-item");
            },4000);
        }
        else{
            let amount = parseInt(amountValue);
            this.expenseInput.value='';
            this.amountInput.value='';
            let expense = {
                id :this.itemID,
                title :expenseValue,
                amount:amount
            }
            this.itemID++;
            this.itemList.push(expense);
            this.addExpense(expense);
            this.expenseAmount.textContent=this.totalExpense();
            //show balance
            this.showBalance();
        }
    }
    addExpense(expense){
        let div = document.createElement('div');
        div.classList.add("exp-item");
        //div.setAttribute("id",expense.id);
        div.innerHTML=`
        <p class="item-name itm">-${expense.title}</p>
        <p class="item-cost itm">${expense.amount}</p>
        <div class="item-icons itm">
            <button data-id="${expense.id}" class="edit"><i class="fa fa-edit" style='color:green'></i></button>
            <button data-id="${expense.id}" class="trash"><i class="fa fa-trash" style='color:red'></i></button>
        </div>
        `;
        this.expenseList.appendChild(div);

    }
    totalExpense(){
        let total=0;
        for(var i = 0; i<this.itemList.length;i++){
            var key = this.itemList[i];
            total = total + key["amount"];
          }
        return total;
    }
    editExpense(element){
        let id =parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement;
        this.expenseList.removeChild(parent);
        let expense = this.itemList.filter(function(item){
            return item.id === id;
        }) 
        this.expenseInput.value=expense[0].title;
        this.amountInput.value=expense[0].amount; 
        let tempList = this.itemList.filter(function(item){
            return item.id !== id;
        })
        this.itemList=tempList;
        this.expenseAmount.textContent=this.totalExpense();

        this.showBalance()

    }
    deleteExpense(element){
        let id =parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement;
        this.expenseList.removeChild(parent);
        let tempList = this.itemList.filter(function(item){
            return item.id !== id;
        })
        console.log(tempList);
        this.itemList=tempList;
        this.expenseAmount.textContent=this.totalExpense();

        this.showBalance();
    }
}
function eventListners(){
    const budgetForm = document.getElementById("budget-form");
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const ui =new UI();
    budgetForm.addEventListener("submit", function(event){
        event.preventDefault();
        ui.submitBudgetForm();
    });
    expenseForm.addEventListener("submit",function(event){
        event.preventDefault();
        ui.submitExpenseForm()
    });
    expenseList.addEventListener("click",function(event){
        if(event.target.parentElement.classList.contains('edit')){
            console.log("edit")
            ui.editExpense(event.target.parentElement)
        }
        else if(event.target.parentElement.classList.contains('trash')){
            console.log("delete")
            ui.deleteExpense(event.target.parentElement)
        }
    });

} 
document.addEventListener("DOMContentLoaded",function(){
    eventListners();
})