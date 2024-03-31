import React from 'react';
import '../css/size-guide.css';

const SizeGuide = () => {
    return (
        <div className="home-body-wrapper">
        <div className="container">

        <h1 className="body-header">AjokeElewu <span>Size Guide</span></h1>

        <div className="align-center required">All Sizes in Inches</div>

        <div className="overflow">
        <table className="table table-hover table-striped"><tbody>
        <tr><th className="group-title">Women's</th><th>Size 6 (Small)</th><th>Size 8/10 (Medium)</th><th>Size 12/14 (Large)</th><th>Size 16 (X Large)</th><th>Size 18/20 (2xLarge)</th></tr>
        <tr><th>Burst</th><td>34.5</td><td>38/49.5</td><td>38/39.5</td><td>40/42</td><td>44/46</td></tr>
        <tr><th>Waist</th><td>26</td><td>27/28</td><td>29.5/31</td><td>31/33</td><td>35/47</td></tr>
        <tr><th>Hips</th><td>37</td><td>38/39</td><td>40.5/42</td><td>42/44</td><td>46/48</td></tr>
        </tbody></table>
        </div>

        </div>
        </div>
    );
};
export default SizeGuide;