
// toolbar工具栏的工具选项（默认展示全部）
const toolOptions = [
		['bold', 'italic', 'underline', 'strike'],
		['blockquote', 'code-block'],
		[{'header': 1}, {'header': 2}],
		[{'list': 'ordered'}, {'list': 'bullet'}],
		[{'indent': '-1'}, {'indent': '+1'}],
		[{'size': ['small', false, 'large', 'huge']}],
		[{'header': [1, 2, 3, 4, 5, 6, false]}],
		[{'color': []}, {'background': []}],
		[{'align': []}],
		[ 'image', 'video'],
		['sourceEditor']     //新添加的工具
];
const handlers = {
		shadeBox:null,
		sourceEditor: function(){     //添加工具方法
				alert('我新添加的工具方法');
		}
};

export default {
		placeholder: '输入文章内容吧',
		theme: 'snow',  // 主题
		modules: {
				toolbar: {
						container: toolOptions,  // 工具栏选项
						handlers: handlers  // 事件重写
				}
		},
		initButton:function(){      //在使用的页面中初始化按钮样式
				const sourceEditorButton = document.querySelector('.ql-sourceEditor');
				sourceEditorButton.style.cssText = "width:80px; border:1px solid #ccc; border-radius:5px;";
				sourceEditorButton.classList.add('el-icon-goods');
				sourceEditorButton.title = "添加商品";
		}
};
