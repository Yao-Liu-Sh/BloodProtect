document.addEventListener('DOMContentLoaded', () => {
    // 入口按钮
    const btnDisease = document.getElementById('btn-disease');
    const btnHealthy = document.getElementById('btn-healthy');
    const btnQuickTest = document.getElementById('btn-quicktest');
    const mainContent = document.getElementById('mainContent');

    // 首页入口点击事件
    btnDisease.addEventListener('click', () => {
        renderDiseaseFlow();
    });
    btnHealthy.addEventListener('click', () => {
        renderHealthyFlow();
    });
    btnQuickTest.addEventListener('click', () => {
        renderQuickTestFlow();
    });

    // 风险自测流程
    function renderQuickTestFlow() {
        mainContent.innerHTML = `
            <h2>风险自测</h2>
            <form id="quickTestForm" class="input-section">
                <div class="input-group">
                    <label>1. 过去3个月内是否有过手术或骨折？</label>
                    <label><input type="radio" name="surgery" value="无" required> 无</label>
                    <label><input type="radio" name="surgery" value="有"> 有</label>
                </div>
                <div class="input-group">
                    <label>2. 您每天久坐时间（含办公/看电视等）？</label>
                    <label><input type="radio" name="sitTime" value="<4"> 少于4小时</label>
                    <label><input type="radio" name="sitTime" value="4-8"> 4-8小时</label>
                    <label><input type="radio" name="sitTime" value=">8"> 超过8小时</label>
                </div>
                <div class="input-group">
                    <label>3. 是否卧床超过3天？</label>
                    <label><input type="radio" name="bed" value="否" required> 否</label>
                    <label><input type="radio" name="bed" value="是"> 是</label>
                </div>
                <div class="input-group">
                    <label>4. 年龄</label>
                    <label><input type="radio" name="age" value="<40" required> 40岁以下</label>
                    <label><input type="radio" name="age" value="40-60"> 40-60岁</label>
                    <label><input type="radio" name="age" value=">60"> 60岁以上</label>
                </div>
                <button type="submit" class="entry-btn" style="width:100%;margin-top:20px;">提交自测</button>
            </form>
            <div id="quickTestResult" class="results-area" style="display:none;"></div>
            <button class="entry-btn" id="backHome3" style="margin-top:20px;">返回首页</button>
        `;
        document.getElementById('backHome3').onclick = renderHome;
        document.getElementById('quickTestForm').onsubmit = function(e) {
            e.preventDefault();
            const surgery = document.querySelector('input[name="surgery"]:checked').value;
            const sitTime = document.querySelector('input[name="sitTime"]:checked').value;
            const bed = document.querySelector('input[name="bed"]:checked').value;
            const age = document.querySelector('input[name="age"]:checked').value;
            let riskScore = 0;
            if (surgery === '有') riskScore += 2;
            if (bed === '是') riskScore += 2;
            if (sitTime === '4-8') riskScore += 1;
            if (sitTime === '>8') riskScore += 2;
            if (age === '40-60') riskScore += 1;
            if (age === '>60') riskScore += 2;
            let result = '';
            if (riskScore >= 4) {
                result = `<p style='color:#e74c3c;font-weight:bold;'>您的血栓风险较高，建议尽快进行详细评估并咨询医生！</p>`;
            } else if (riskScore >= 2) {
                result = `<p style='color:#f39c12;font-weight:bold;'>您的血栓风险中等，建议进入详细评估流程进一步分析。</p>`;
            } else {
                result = `<p style='color:#27ae60;font-weight:bold;'>您的血栓风险较低，建议保持良好生活习惯。</p>`;
            }
            document.getElementById('quickTestResult').innerHTML = result;
            document.getElementById('quickTestResult').style.display = 'block';
        };
    }

    // 有基础疾病群体评估流程
    function renderDiseaseFlow() {
        mainContent.innerHTML = `
            <h2>基础疾病群体评估流程</h2>
            <form id="diseaseBaseForm" class="input-section">
                <div class="input-group">
                    <label>1. 基础病类型</label>
                    <select name="diseaseType" id="diseaseType" required>
                        <option value="">请选择</option>
                        <option value="骨折">骨折</option>
                        <option value="手术">手术</option>
                        <option value="糖尿病">糖尿病</option>
                        <option value="其他">其他</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>2. 病程/手术类型</label>
                    <input type="text" name="diseaseDetail" id="diseaseDetail" placeholder="如：2周/髋关节置换" required />
                </div>
                <div class="input-group">
                    <label>3. 治疗方式</label>
                    <input type="text" name="treatment" id="treatment" placeholder="如：胰岛素/术后制动" required />
                </div>
                <button type="submit" class="entry-btn" style="width:100%;margin-top:20px;white-space:nowrap;font-size:1.05rem;">下一步：上传检测数据</button>
            </form>
            <button class="entry-btn" id="backHome1" style="margin-top:20px;">返回首页</button>
        `;
        document.getElementById('backHome1').onclick = renderHome;
        document.getElementById('diseaseBaseForm').onsubmit = function(e) {
            e.preventDefault();
            // 收集基础信息，后续可传递到下一步
            const diseaseType = document.getElementById('diseaseType').value;
            const diseaseDetail = document.getElementById('diseaseDetail').value;
            const treatment = document.getElementById('treatment').value;
            const baseInfo = { diseaseType, diseaseDetail, treatment };
            renderDiseaseDetectionStep(baseInfo);
        };
    }

    // 检测数据上传（补充表单）
    function renderDiseaseDetectionStep(baseInfo) {
        mainContent.innerHTML = `
            <h2>检测数据上传</h2>
            <form id="diseaseDetectForm" class="input-section">
                <div class="input-group">
                    <label>1. 收缩压（mmHg）</label>
                    <input type="number" name="sbp" id="sbp" step="1" min="60" max="250" required placeholder="如：120" />
                </div>
                <div class="input-group">
                    <label>2. 舒张压（mmHg）</label>
                    <input type="number" name="dbp" id="dbp" step="1" min="30" max="150" required placeholder="如：80" />
                </div>
                <div class="input-group">
                    <label>3. 脉搏（次/分）</label>
                    <input type="number" name="pulse" id="pulse" step="1" min="30" max="200" required placeholder="如：75" />
                </div>
                <div class="input-group">
                    <label>4. 呼吸频率（次/分）</label>
                    <input type="number" name="resp" id="resp" step="1" min="5" max="40" required placeholder="如：18" />
                </div>
                <div class="input-group">
                    <label>5. 血小板（×10⁹/L）</label>
                    <input type="number" name="platelet" id="platelet" step="1" min="10" max="1000" required placeholder="如：250" />
                </div>
                <div class="input-group">
                    <label>6. D-二聚体（mg/L）</label>
                    <input type="number" name="ddimer" id="ddimer" step="0.01" min="0" max="10" required placeholder="如：0.5" />
                </div>
                <div class="input-group">
                    <label>7. PT（凝血酶原时间，秒）</label>
                    <input type="number" name="pt" id="pt" step="0.1" min="5" max="40" required placeholder="如：12.5" />
                </div>
                <div class="input-group">
                    <label>8. APTT（活化部分凝血活酶时间，秒）</label>
                    <input type="number" name="aptt" id="aptt" step="0.1" min="10" max="100" required placeholder="如：32" />
                </div>
                <div class="input-group">
                    <label>9. 纤维蛋白原（g/L）</label>
                    <input type="number" name="fibrinogen" id="fibrinogen" step="0.1" min="0" max="10" required placeholder="如：3.2" />
                </div>
                <button type="submit" class="entry-btn" style="width:100%;margin-top:20px;">下一步：风险分析</button>
            </form>
            <button class="entry-btn" id="backHome1b" style="margin-top:20px;">返回首页</button>
        `;
        document.getElementById('backHome1b').onclick = renderHome;
        document.getElementById('diseaseDetectForm').onsubmit = function(e) {
            e.preventDefault();
            const detectData = {
                sbp: parseInt(document.getElementById('sbp').value),
                dbp: parseInt(document.getElementById('dbp').value),
                pulse: parseInt(document.getElementById('pulse').value),
                resp: parseInt(document.getElementById('resp').value),
                platelet: parseInt(document.getElementById('platelet').value),
                ddimer: parseFloat(document.getElementById('ddimer').value),
                pt: parseFloat(document.getElementById('pt').value),
                aptt: parseFloat(document.getElementById('aptt').value),
                fibrinogen: parseFloat(document.getElementById('fibrinogen').value)
            };
            renderDiseaseRiskAnalysis(baseInfo, detectData);
        };
    }

    // 风险分析与预测（详细实现）
    function renderDiseaseRiskAnalysis(baseInfo, detectData) {
        // 获取历史数据
        let lastDetectData = JSON.parse(localStorage.getItem('lastDetectData') || '{}');
        // 保存本次数据
        localStorage.setItem('lastDetectData', JSON.stringify(detectData));
        // 指标参考范围
        const ref = {
            sbp: { min: 90, max: 140 }, // mmHg
            dbp: { min: 60, max: 90 }, // mmHg
            pulse: { min: 60, max: 100 }, // 次/分
            resp: { min: 12, max: 20 }, // 次/分
            platelet: { min: 100, max: 300 }, // ×10⁹/L
            ddimer: { max: 0.5 }, // mg/L
            fibrinogen: { min: 2.0, max: 4.0 }, // g/L
            pt: { min: 10, max: 14 }, // 秒
            aptt: { min: 25, max: 35 } // 秒
        };
        // 异常判定
        const abnormal = [];
        if (detectData.sbp > ref.sbp.max || detectData.sbp < ref.sbp.min) abnormal.push('收缩压异常');
        if (detectData.dbp > ref.dbp.max || detectData.dbp < ref.dbp.min) abnormal.push('舒张压异常');
        if (detectData.pulse > ref.pulse.max || detectData.pulse < ref.pulse.min) abnormal.push('脉搏异常');
        if (detectData.resp > ref.resp.max || detectData.resp < ref.resp.min) abnormal.push('呼吸频率异常');
        if (detectData.platelet > 450 || detectData.platelet < 100) abnormal.push('血小板异常');
        if (detectData.ddimer > ref.ddimer.max) abnormal.push('D-二聚体升高');
        if (detectData.fibrinogen > ref.fibrinogen.max || detectData.fibrinogen < ref.fibrinogen.min) abnormal.push('纤维蛋白原异常');
        if (detectData.pt > ref.pt.max || detectData.pt < ref.pt.min) abnormal.push('PT异常');
        if (detectData.aptt > ref.aptt.max || detectData.aptt < ref.aptt.min) abnormal.push('APTT异常');
        // 关联路径描述
        let pathDesc = '';
        if (baseInfo.diseaseType === '糖尿病') {
            pathDesc = '糖尿病→血管损伤→血小板聚集→D-二聚体↑→高凝状态';
        } else if (baseInfo.diseaseType === '骨折' || baseInfo.diseaseType === '手术') {
            pathDesc = '骨折/手术→组织损伤→炎症反应→凝血因子激活→D-二聚体↑→血栓风险↑';
        } else {
            pathDesc = '基础疾病→炎症/代谢异常→凝血功能改变→血栓风险变化';
        }
        // 风险评分
        let riskLevel = '低风险';
        let riskPercent = '约5%';
        let advice = '建议保持良好生活习惯，定期复查。';
        // Initialize nursing suggestions string
        let nursingSuggestions = '';

        // Add suggestions based on blood test results and other factors

        // APTT suggestions
        if (detectData.aptt > ref.aptt.max) {
            nursingSuggestions += '<h4>APTT过高护理建议：</h4><ul><li>饮食上可适当增加富含维生素K的食物摄入，像菠菜、西兰花、甘蓝等绿叶蔬菜，维生素K有助于凝血因子合成，辅助改善凝血。</li><li>避免大量饮酒，酒精可能影响肝脏功能，进而影响凝血因子合成。</li><li>穿宽松衣物，防束缚出血。</li><li>居家防滑，出行防磕碰。</li></ul>';
        } else if (detectData.aptt < ref.aptt.min) {
            nursingSuggestions += '<h4>APTT过低护理建议：</h4><ul><li>遵循低脂、低盐、低糖饮食原则。减少肥肉、油炸食品等高脂肪食物摄入，以防血液黏稠度增加；限制咸菜、腌肉等高盐食物，避免血压升高影响血管健康；少吃蛋糕、糖果等高糖食物，防止血糖异常。</li><li>可多吃富含膳食纤维的全谷物、新鲜蔬果，促进血液循环。</li><li>室内常活动。</li><li>坚持运动，长途定时起身。</li></ul>';
        }

        // PT suggestions
        if (detectData.pt > ref.pt.max) {
            nursingSuggestions += '<h4>PT过高护理建议：</h4><ul><li>多吃富含优质蛋白的食物，如牛奶、鸡蛋、鱼肉等，为肝脏合成凝血因子提供原料。</li><li>同时补充富含维生素K的食物。</li><li>避免食用霉变、腐烂食物，防止加重肝脏负担，因为肝脏疾病是PT异常的常见原因之一。</li><li>衣物宽松易穿脱。</li><li>居家防护，出行慢且稳。</li></ul>';
        } else if (detectData.pt < ref.pt.min) {
            nursingSuggestions += '<h4>PT过低护理建议：</h4><ul><li>控制脂肪、盐和糖的摄入。</li><li>可适当增加具有血管保护作用的食物，如黑木耳，其含有的木耳多糖等成分有助于降低血液黏稠度，预防血栓形成。</li><li>作息规律，室内活动便利。</li><li>多户外，少久站。</li></ul>';
        }

        // FIB suggestions
        if (detectData.fibrinogen > ref.fibrinogen.max) {
            nursingSuggestions += '<h4>FIB过高护理建议：</h4><ul><li>以清淡饮食为主，多吃新鲜蔬菜、水果，像苹果、橙子、芹菜等，补充维生素和膳食纤维，有助于降低血液黏稠度。</li><li>减少红肉（如猪肉、牛肉、羊肉 ）摄入量，因其可能会使体内炎症反应增加，导致纤维蛋白原升高。</li><li>避免食用加工肉制品，如香肠、火腿等，其含有较多添加剂，不利于控制指标。</li><li>穿透气衣物，防皮肤炎症。</li><li>环境整洁，心情舒畅。</li><li>常运动，不过劳。</li></ul>';
        } else if (detectData.fibrinogen < ref.fibrinogen.min) {
            nursingSuggestions += '<h4>FIB过低护理建议：</h4><ul><li>保证营养均衡，增加蛋白质摄入，如瘦肉、豆类等，为机体合成纤维蛋白原提供物质基础。</li><li>多吃富含铁元素的食物，如动物肝脏、红枣等，预防因贫血等情况加重凝血异常。</li><li>同时避免过度节食或偏食。</li><li>增减衣物防感染。</li><li>温湿度适宜助恢复。</li><li>保暖出行，少去人多场所。</li></ul>';
        }

        // Platelet suggestions (using existing abnormal check)
        if (detectData.platelet > 450) { // High platelet count
             nursingSuggestions += '<h4>血小板过高护理建议：</h4><ul><li>穿宽松衣物防摩擦；</li><li>忌高脂饮食，多吃生姜、燕麦等抗聚、促循环食物；</li><li>避免久坐，适量运动防血栓。</li></ul>';
        } else if (detectData.platelet < 100) { // Low platelet count
             nursingSuggestions += '<h4>血小板过低护理建议：</h4><ul><li>选柔软宽松衣，防静电刺激；</li><li>多吃高蛋白、维C食物，忌粗糙硬食；</li><li>减少剧烈活动，防磕碰出血。</li></ul>';
        }

        // D-dimer suggestions (using existing abnormal check)
        if (detectData.ddimer > ref.ddimer.max) { // High D-dimer
            nursingSuggestions += '<h4>D-二聚体过高护理建议：</h4><ul><li>饮食控脂糖，多吃木耳、洋葱护血管；</li><li>室内常通风，规律作息；</li><li>避免久坐，多运动促循环。</li></ul>';
        } else { // D-dimer not high, use the "过低" suggestions from user as general advice when not high
             nursingSuggestions += '<h4>D-二聚体护理建议：</h4><ul><li>均衡饮食补营养，防贫血；</li><li>注意保暖防感染；</li><li>适度活动，避免劳累。</li></ul>';
        }

        if (abnormal.length >= 3) {
            riskLevel = '高风险';
            riskPercent = '约20%';
            advice = '建议尽快就医，必要时进行抗凝治疗。';
        } else if (abnormal.length === 2) {
            riskLevel = '中风险';
            riskPercent = '约10%';
            advice = '建议加强监测，遵医嘱调整治疗方案。';
        } else if (abnormal.length === 1) {
            riskLevel = '低-中风险';
            riskPercent = '约7%';
            advice = '建议关注异常指标，适当调整生活方式。';
        }
        // 主要指标对比表格
        let compareTable = `
            <table border="1" style="margin:10px 0;min-width:350px;text-align:center;">
                <tr><th>指标</th><th>上次</th><th>本次</th></tr>
                <tr><td>收缩压</td><td>${lastDetectData.sbp || '-'}</td><td>${detectData.sbp}</td></tr>
                <tr><td>舒张压</td><td>${lastDetectData.dbp || '-'}</td><td>${detectData.dbp}</td></tr>
                <tr><td>脉搏</td><td>${lastDetectData.pulse || '-'}</td><td>${detectData.pulse}</td></tr>
                <tr><td>呼吸频率</td><td>${lastDetectData.resp || '-'}</td><td>${detectData.resp}</td></tr>
                <tr><td>血小板</td><td>${lastDetectData.platelet || '-'}</td><td>${detectData.platelet}</td></tr>
                <tr><td>D-二聚体</td><td>${lastDetectData.ddimer || '-'}</td><td>${detectData.ddimer}</td></tr>
                <tr><td>PT</td><td>${lastDetectData.pt || '-'}</td><td>${detectData.pt}</td></tr>
                <tr><td>APTT</td><td>${lastDetectData.aptt || '-'}</td><td>${detectData.aptt}</td></tr>
                <tr><td>FIB</td><td>${lastDetectData.fibrinogen || '-'}</td><td>${detectData.fibrinogen}</td></tr>
            </table>
        `;
        // 详细报告
        let report = `<div class='results-area'>
            <h3>风险分析报告</h3>
            <ul>
                <li><b>主要指标对比：</b>${compareTable}</li>
                <li><b>基础病类型：</b>${baseInfo.diseaseType}</li>
                <li><b>病程/手术类型：</b>${baseInfo.diseaseDetail}</li>
                <li><b>治疗方式：</b>${baseInfo.treatment}</li>
                <li><b>检测数据：</b>
                    <ul>
                        <li>收缩压：${detectData.sbp} mmHg</li>
                        <li>舒张压：${detectData.dbp} mmHg</li>
                        <li>脉搏：${detectData.pulse} 次/分</li>
                        <li>呼吸频率：${detectData.resp} 次/分</li>
                        <li>血小板：${detectData.platelet} ×10⁹/L</li>
                        <li>D-二聚体：${detectData.ddimer} mg/L</li>
                        <li>PT：${detectData.pt} 秒</li>
                        <li>APTT：${detectData.aptt} 秒</li>
                        <li>FIB：${detectData.fibrinogen} g/L</li>
                    </ul>
                </li>
                <li><b>异常指标：</b>${abnormal.length > 0 ? abnormal.join('，') : '无'}</li>
                <li><b>风险关联路径：</b>${pathDesc}</li>
                <li><b>风险等级：</b><span style='color:${riskLevel==='高风险'?'#e74c3c':riskLevel==='中风险'?'#f39c12':'#27ae60'};font-weight:bold;'>${riskLevel}</span></li>
                <li><b>未来2个月静脉血栓概率：</b>${riskPercent}</li>
            </ul>
            <div class='final-assessment'><b>健康建议：</b>${advice}</div>
            ${nursingSuggestions}
        </div>`;
        mainContent.innerHTML = `
            <h2>风险分析与预测</h2>
            <div id="chart" style="width:100%;max-width:500px;height:350px;margin:0 auto 30px auto;"></div>
            ${report}
            <button class="entry-btn" id="backHome1c" style="margin-top:20px;">返回首页</button>
        `;
        // 渲染雷达图
        setTimeout(() => {
            const chart = echarts.init(document.getElementById('chart'));
            chart.setOption({
                title: { text: '关键指标异常程度', left: 'center', top: 10, textStyle: { fontSize: 16 } },
                tooltip: {},
                radar: {
                    indicator: [
                        { name: '收缩压', max: 200 },
                        { name: '舒张压', max: 120 },
                        { name: '脉搏', max: 200 },
                        { name: '呼吸频率', max: 40 },
                        { name: '血小板', max: 600 },
                        { name: 'D-二聚体', max: 2 },
                        { name: 'PT', max: 30 },
                        { name: 'APTT', max: 60 },
                        { name: 'FIB', max: 8 }
                    ],
                    radius: 90
                },
                series: [{
                    name: '检测值',
                    type: 'radar',
                    data: [
                        {
                            value: [detectData.sbp, detectData.dbp, detectData.pulse, detectData.resp, detectData.platelet, detectData.ddimer, detectData.pt, detectData.aptt, detectData.fibrinogen],
                            areaStyle: { color: 'rgba(52,152,219,0.3)' },
                            lineStyle: { color: '#3498db' }
                        }
                    ]
                }]
            });
        }, 0);
        document.getElementById('backHome1c').onclick = renderHome;
    }

    // 健康/亚健康群体评估流程
    function renderHealthyFlow() {
        mainContent.innerHTML = `
            <h2>健康/亚健康群体评估流程</h2>
            <form id="healthyHabitForm" class="input-section">
                <div class="input-group">
                    <label>1. 您每天久坐/卧床时长（小时）</label>
                    <select id="sitTime" required>
                        <option value="">请选择</option>
                        <option value="<4">少于4小时</option>
                        <option value="4-8">4-8小时</option>
                        <option value=">8">超过8小时</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>2. 吸烟量（支/天）</label>
                    <input type="number" id="smoke" min="0" max="100" step="1" required placeholder="如：0" />
                </div>
                <div class="input-group">
                    <label>3. 饮酒频率</label>
                    <select id="drink" required>
                        <option value="">请选择</option>
                        <option value="从不">从不</option>
                        <option value="偶尔">偶尔</option>
                        <option value="每周">每周</option>
                        <option value="每天">每天</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>4. 睡眠时长（小时）</label>
                    <input type="number" id="sleepTime" min="0" max="24" step="0.5" required placeholder="如：7.5" />
                </div>
                <div class="input-group">
                    <label>5. 睡眠质量评分（1-5分，5为最佳）</label>
                    <select id="sleepQuality" required>
                        <option value="">请选择</option>
                        <option value="1">1分</option>
                        <option value="2">2分</option>
                        <option value="3">3分</option>
                        <option value="4">4分</option>
                        <option value="5">5分</option>
                    </select>
                </div>
                <button type="submit" class="entry-btn" style="width:100%;margin-top:20px;white-space:nowrap;">下一步：上传体检数据</button>
            </form>
            <button class="entry-btn" id="backHome2" style="margin-top:20px;">返回首页</button>
        `;
        document.getElementById('backHome2').onclick = renderHome;
        document.getElementById('healthyHabitForm').onsubmit = function(e) {
            e.preventDefault();
            const habitData = {
                sitTime: document.getElementById('sitTime').value,
                smoke: parseInt(document.getElementById('smoke').value),
                drink: document.getElementById('drink').value,
                sleepTime: parseFloat(document.getElementById('sleepTime').value),
                sleepQuality: parseInt(document.getElementById('sleepQuality').value)
            };
            renderHealthyExamStep(habitData);
        };
    }

    // 体检数据上传（详细实现，含BMI自动计算）
    function renderHealthyExamStep(habitData) {
        mainContent.innerHTML = `
            <h2>体检数据上传</h2>
            <form id="healthyExamForm" class="input-section">
                <div class="input-group">
                    <label>1. LDL-C（低密度脂蛋白胆固醇，mmol/L）</label>
                    <input type="number" id="ldl" step="0.01" min="0" max="10" required placeholder="如：2.8" />
                </div>
                <div class="input-group">
                    <label>2. 收缩压（mmHg）</label>
                    <input type="number" id="sbp" step="1" min="60" max="250" required placeholder="如：120" />
                </div>
                <div class="input-group">
                    <label>3. 舒张压（mmHg）</label>
                    <input type="number" id="dbp" step="1" min="30" max="150" required placeholder="如：80" />
                </div>
                <div class="input-group">
                    <label>4. 脉搏（次/分）</label>
                    <input type="number" id="pulse" step="1" min="30" max="200" required placeholder="如：75" />
                </div>
                <div class="input-group">
                    <label>5. 呼吸频率（次/分）</label>
                    <input type="number" id="resp" step="1" min="5" max="40" required placeholder="如：18" />
                </div>
                <div class="input-group">
                    <label>6. 体重（kg）</label>
                    <input type="number" id="weight" step="0.1" min="20" max="300" required placeholder="如：65" />
                </div>
                <div class="input-group">
                    <label>7. 身高（cm）</label>
                    <input type="number" id="height" step="0.1" min="100" max="250" required placeholder="如：170" />
                </div>
                <div class="input-group">
                    <label>BMI（体重指数，kg/m²）</label>
                    <input type="text" id="bmi" readonly placeholder="自动计算" />
                </div>
                <button type="submit" class="entry-btn" style="width:100%;margin-top:20px;">下一步：风险分析</button>
            </form>
            <button class="entry-btn" id="backHome2b" style="margin-top:20px;">返回首页</button>
        `;
        document.getElementById('backHome2b').onclick = renderHome;
        // BMI自动计算
        const weightInput = document.getElementById('weight');
        const heightInput = document.getElementById('height');
        const bmiInput = document.getElementById('bmi');
        function updateBMI() {
            const w = parseFloat(weightInput.value);
            const h = parseFloat(heightInput.value) / 100;
            if (w > 0 && h > 0) {
                const bmi = w / (h * h);
                bmiInput.value = bmi.toFixed(1);
            } else {
                bmiInput.value = '';
            }
        }
        weightInput.addEventListener('input', updateBMI);
        heightInput.addEventListener('input', updateBMI);
        document.getElementById('healthyExamForm').onsubmit = function(e) {
            e.preventDefault();
            const examData = {
                ldl: parseFloat(document.getElementById('ldl').value),
                sbp: parseInt(document.getElementById('sbp').value),
                dbp: parseInt(document.getElementById('dbp').value),
                pulse: parseInt(document.getElementById('pulse').value),
                resp: parseInt(document.getElementById('resp').value),
                weight: parseFloat(document.getElementById('weight').value),
                height: parseFloat(document.getElementById('height').value),
                bmi: parseFloat(document.getElementById('bmi').value)
            };
            renderHealthyRiskAnalysis(habitData, examData);
        };
    }

    // 风险分析与预测（详细实现）
    function renderHealthyRiskAnalysis(habitData, examData) {
        // 获取历史数据
        let lastExamData = JSON.parse(localStorage.getItem('lastExamData') || '{}');
        // 保存本次数据
        localStorage.setItem('lastExamData', JSON.stringify(examData));
        // 异常项判定
        const abnormal = [];
        if (examData.ldl > 3.4) abnormal.push('LDL-C＞3.4mmol/L');
        if (examData.bmi > 28) abnormal.push('BMI＞28');
        if (examData.sbp > 140) abnormal.push('收缩压＞140mmHg');
        if (examData.dbp > 90) abnormal.push('舒张压＞90mmHg');
        if (examData.pulse > 100 || examData.pulse < 60) abnormal.push('脉搏异常');
        if (examData.resp > 20 || examData.resp < 12) abnormal.push('呼吸频率异常');
        if (habitData.sitTime === '>8') abnormal.push('久坐＞8小时/天');
        else if (habitData.sitTime === '4-8') abnormal.push('久坐4-8小时/天');
        if (habitData.smoke > 10) abnormal.push('吸烟＞10支/天');
        if (habitData.drink === '每天') abnormal.push('饮酒频率高');
        if (habitData.sleepTime < 6) abnormal.push('睡眠时长＜6小时');
        if (habitData.sleepQuality <= 2) abnormal.push('睡眠质量较差');
        // 行为-指标关联路径
        let pathDesc = '';
        if (habitData.sitTime === '>8') {
            pathDesc = '久坐＞8小时/天→血液流速↓→FIB浓度↑→血栓风险+20%';
        } else if (habitData.sitTime === '4-8') {
            pathDesc = '久坐4-8小时/天→血液流速略降→FIB轻度升高→血栓风险+10%';
        } else {
            pathDesc = '生活习惯良好→血栓风险较低';
        }
        // 趋势预测
        let trend = '';
        if (abnormal.includes('久坐＞8小时/天') || abnormal.includes('BMI＞28') || abnormal.includes('LDL-C＞3.4mmol/L')) {
            trend = '若持续当前习惯，6个月后D-二聚体可能升高至异常范围，血栓风险从低升至中风险。';
        } else if (abnormal.length > 0) {
            trend = '部分指标或习惯存在异常，建议改善以降低未来风险。';
        } else {
            trend = '如保持当前健康习惯，血栓风险维持较低水平。';
        }
        // 风险评分
        let riskLevel = '低风险';
        let riskPercent = '约3%';
        let advice = '建议保持健康生活方式，定期体检。';
        // Initialize nursing suggestions string
        let nursingSuggestions = '';

        // Add suggestions based on blood test results and other factors

        // APTT suggestions
        if (examData.aptt > ref.aptt.max) {
            nursingSuggestions += '<h4>APTT过高护理建议：</h4><ul><li>饮食上可适当增加富含维生素K的食物摄入，像菠菜、西兰花、甘蓝等绿叶蔬菜，维生素K有助于凝血因子合成，辅助改善凝血。</li><li>避免大量饮酒，酒精可能影响肝脏功能，进而影响凝血因子合成。</li><li>穿宽松衣物，防束缚出血。</li><li>居家防滑，出行防磕碰。</li></ul>';
        } else if (examData.aptt < ref.aptt.min) {
            nursingSuggestions += '<h4>APTT过低护理建议：</h4><ul><li>遵循低脂、低盐、低糖饮食原则。减少肥肉、油炸食品等高脂肪食物摄入，以防血液黏稠度增加；限制咸菜、腌肉等高盐食物，避免血压升高影响血管健康；少吃蛋糕、糖果等高糖食物，防止血糖异常。</li><li>可多吃富含膳食纤维的全谷物、新鲜蔬果，促进血液循环。</li><li>室内常活动。</li><li>坚持运动，长途定时起身。</li></ul>';
        }

        // PT suggestions
        if (examData.pt > ref.pt.max) {
            nursingSuggestions += '<h4>PT过高护理建议：</h4><ul><li>多吃富含优质蛋白的食物，如牛奶、鸡蛋、鱼肉等，为肝脏合成凝血因子提供原料。</li><li>同时补充富含维生素K的食物。</li><li>避免食用霉变、腐烂食物，防止加重肝脏负担，因为肝脏疾病是PT异常的常见原因之一。</li><li>衣物宽松易穿脱。</li><li>居家防护，出行慢且稳。</li></ul>';
        } else if (examData.pt < ref.pt.min) {
            nursingSuggestions += '<h4>PT过低护理建议：</h4><ul><li>控制脂肪、盐和糖的摄入。</li><li>可适当增加具有血管保护作用的食物，如黑木耳，其含有的木耳多糖等成分有助于降低血液黏稠度，预防血栓形成。</li><li>作息规律，室内活动便利。</li><li>多户外，少久站。</li></ul>';
        }

        // FIB suggestions
        if (examData.fibrinogen > ref.fibrinogen.max) {
            nursingSuggestions += '<h4>FIB过高护理建议：</h4><ul><li>以清淡饮食为主，多吃新鲜蔬菜、水果，像苹果、橙子、芹菜等，补充维生素和膳食纤维，有助于降低血液黏稠度。</li><li>减少红肉（如猪肉、牛肉、羊肉 ）摄入量，因其可能会使体内炎症反应增加，导致纤维蛋白原升高。</li><li>避免食用加工肉制品，如香肠、火腿等，其含有较多添加剂，不利于控制指标。</li><li>穿透气衣物，防皮肤炎症。</li><li>环境整洁，心情舒畅。</li><li>常运动，不过劳。</li></ul>';
        } else if (examData.fibrinogen < ref.fibrinogen.min) {
            nursingSuggestions += '<h4>FIB过低护理建议：</h4><ul><li>保证营养均衡，增加蛋白质摄入，如瘦肉、豆类等，为机体合成纤维蛋白原提供物质基础。</li><li>多吃富含铁元素的食物，如动物肝脏、红枣等，预防因贫血等情况加重凝血异常。</li><li>同时避免过度节食或偏食。</li><li>增减衣物防感染。</li><li>温湿度适宜助恢复。</li><li>保暖出行，少去人多场所。</li></ul>';
        }

        // Platelet suggestions (using existing abnormal check)
        if (examData.platelet > 450) { // High platelet count
             nursingSuggestions += '<h4>血小板过高护理建议：</h4><ul><li>穿宽松衣物防摩擦；</li><li>忌高脂饮食，多吃生姜、燕麦等抗聚、促循环食物；</li><li>避免久坐，适量运动防血栓。</li></ul>';
        } else if (examData.platelet < 100) { // Low platelet count
             nursingSuggestions += '<h4>血小板过低护理建议：</h4><ul><li>选柔软宽松衣，防静电刺激；</li><li>多吃高蛋白、维C食物，忌粗糙硬食；</li><li>减少剧烈活动，防磕碰出血。</li></ul>';
        }

        // D-dimer suggestions (using existing abnormal check)
        if (examData.ddimer > ref.ddimer.max) { // High D-dimer
            nursingSuggestions += '<h4>D-二聚体过高护理建议：</h4><ul><li>饮食控脂糖，多吃木耳、洋葱护血管；</li><li>室内常通风，规律作息；</li><li>避免久坐，多运动促循环。</li></ul>';
        } else { // D-dimer not high, use the "过低" suggestions from user as general advice when not high
             nursingSuggestions += '<h4>D-二聚体护理建议：</h4><ul><li>均衡饮食补营养，防贫血；</li><li>注意保暖防感染；</li><li>适度活动，避免劳累。</li></ul>';
        }

        if (abnormal.length >= 3) {
            riskLevel = '高风险';
            riskPercent = '约15%';
            advice = '建议积极改善生活习惯，必要时咨询医生。';
        } else if (abnormal.length === 2) {
            riskLevel = '中风险';
            riskPercent = '约8%';
            advice = '建议关注异常项，适当调整生活方式。';
        } else if (abnormal.length === 1) {
            riskLevel = '低-中风险';
            riskPercent = '约5%';
            advice = '建议关注异常项，保持良好习惯。';
        }
        // 主要指标对比表格
        let compareTable = `
            <table border="1" style="margin:10px 0;min-width:300px;text-align:center;">
                <tr><th>指标</th><th>上次</th><th>本次</th></tr>
                <tr><td>收缩压</td><td>${lastExamData.sbp || '-'}</td><td>${examData.sbp}</td></tr>
                <tr><td>舒张压</td><td>${lastExamData.dbp || '-'}</td><td>${examData.dbp}</td></tr>
                <tr><td>脉搏</td><td>${lastExamData.pulse || '-'}</td><td>${examData.pulse}</td></tr>
                <tr><td>呼吸频率</td><td>${lastExamData.resp || '-'}</td><td>${examData.resp}</td></tr>
                <tr><td>BMI</td><td>${lastExamData.bmi || '-'}</td><td>${examData.bmi}</td></tr>
            </table>
        `;
        // 详细报告
        let report = `<div class='results-area'>
            <h3>风险分析报告</h3>
            <ul>
                <li><b>主要指标对比：</b>${compareTable}</li>
                <li><b>生活习惯：</b>
                    <ul>
                        <li>久坐/卧床时长：${habitData.sitTime}</li>
                        <li>吸烟量：${habitData.smoke} 支/天</li>
                        <li>饮酒频率：${habitData.drink}</li>
                        <li>睡眠时长：${habitData.sleepTime} 小时</li>
                        <li>睡眠质量评分：${habitData.sleepQuality} 分</li>
                    </ul>
                </li>
                <li><b>体检数据：</b>
                    <ul>
                        <li>LDL-C：${examData.ldl} mmol/L</li>
                        <li>收缩压：${examData.sbp} mmHg</li>
                        <li>舒张压：${examData.dbp} mmHg</li>
                        <li>脉搏：${examData.pulse} 次/分</li>
                        <li>呼吸频率：${examData.resp} 次/分</li>
                        <li>体重：${examData.weight} kg</li>
                        <li>身高：${examData.height} cm</li>
                        <li>BMI：${examData.bmi}</li>
                    </ul>
                </li>
                <li><b>异常项：</b>${abnormal.length > 0 ? abnormal.join('，') : '无'}</li>
                <li><b>行为-指标关联：</b>${pathDesc}</li>
                <li><b>趋势预测：</b>${trend}</li>
                <li><b>风险等级：</b><span style='color:${riskLevel==='高风险'?'#e74c3c':riskLevel==='中风险'?'#f39c12':'#27ae60'};font-weight:bold;'>${riskLevel}</span></li>
                <li><b>未来6个月静脉血栓概率：</b>${riskPercent}</li>
            </ul>
            <div class='final-assessment'><b>健康建议：</b>${advice}</div>
            ${nursingSuggestions}
        </div>`;
        mainContent.innerHTML = `
            <h2>风险分析与预测</h2>
            ${report}
            <button class="entry-btn" id="backHome2c" style="margin-top:20px;">返回首页</button>
        `;
        document.getElementById('backHome2c').onclick = renderHome;
    }

    function renderHome() {
        mainContent.innerHTML = '';
    }
}); 