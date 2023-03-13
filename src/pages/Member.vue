<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column class="col" prop="id" label="ID" />
		<el-table-column prop="level" label="会员等级" />
		<el-table-column prop="price" label="价格" />
		<el-table-column prop="CreationTime" label="创建时间"/>
		<!-- <el-table-column prop="AuditStatus" label="审核状态"/> -->
    <el-table-column align="center" label="审核状态">
      <template #default="scope">
        <el-button
          v-if="scope.row.AuditStatus=='未通过'"
          size="small"
          type="danger"
          @click="handleDelete(scope.row,$event)"
          >{{scope.row.AuditStatus}}</el-button
        >
        <el-button
          v-else
          size="small"
          type="success"
          @click="handleDelete(scope.row,$event)"
          >{{scope.row.AuditStatus}}</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
		<!-- <span class="demonstration">调整每页显示条数</span> -->
		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
			v-model:currentPage="currentPage2"
			layout="prev, pager, next,jumper" :total="num">
			<!-- layout="sizes, prev, pager, next" :total="700000"> -->
		</el-pagination>
	</div>
</template>

<script lang="ts">
import axios from 'axios';
export default {
	data() {
		return {
			tableData:[],
      		num:0,
			currentPage2:1,
		}
	},
	created(){
	
	let PageNum:Number=localStorage.getItem("PageNum");
	if(PageNum==null){
		localStorage.setItem("PageNum",1);
	}else{
		PageNum=localStorage.getItem("PageNum");
	}
    axios.post('https://443409hb31.imdo.co/index.php/Member', {
			pageNum: PageNum,
		}).then(res => {
			this.tableData=res.data[0];
			console.log(res.data);
			this.currentPage2=parseInt(PageNum);//需要转换为整数
			console.log(PageNum);
			this.num=(res.data[1]-10);
		}).catch(err => {
			//添加错误，这里也会显示
			console.log("获取数据失败" + err);
		})
	},
	methods: {
    handleDelete(index,e){
    //   console.log(index,e.currentTarget);
      //更改当前元素的内容(firstElementChild.innerHTML子元素的内容)
      if(e.currentTarget.firstElementChild.innerHTML=="未通过"){
        e.currentTarget.firstElementChild.innerHTML="通过";
        e.currentTarget.style.backgroundColor = "#67C23A";//设置按钮
        e.currentTarget.style.border = "#67C23A";
		//向后台提交审核通过
		axios.post('https://443409hb31.imdo.co/index.php/AuditStatus', {
			id:index
		}).then(res => {
			console.log(res.data);
			this.$router.go(0);
		}).catch(err => {
			//添加错误，这里也会显示
			console.log("获取数据失败" + err);
		})
		//刷新页面,更改审核状态
		
      }
      
    },
    handleSizeChange(val){
			// console.log(`每页 ${val} 条`);
		},
    
		handleCurrentChange(val){
			localStorage.setItem("PageNum",val);
			console.log(`当前页: ${val}`);
			axios.post('https://443409hb31.imdo.co/index.php/Member', {
				pageNum: val
			}).then(res => {
				//切换之前需要清除数组中添加的数据
				for (var i = 0; i <10; i++) {
					this.tableData.pop(i);
				}
        //添加数据
				for (var i = 0; i < res.data[0].length; i++) {
					this.tableData.push(res.data[0][i]);
				}
			}).catch(err => {
				//添加错误，这里也会显示
				console.log("获取数据失败" + err);
			})
		},
	}
}
</script>
