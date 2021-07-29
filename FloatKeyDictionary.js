
/**
 * @classdesc 浮点数形Key字典容器
 */
class FloatKeyDictionary extends Map
{
	/**
	 * @returns {FloatKeyDictionary}
	 */
	static Create()
	{
		const data = new FloatKeyDictionary();
		let functions = Object.getOwnPropertyNames(FloatKeyDictionary.prototype);
		const filterFunction = v =>
		{
			return v !== 'constructor';
		};
		functions = functions.filter(filterFunction);
		return new Proxy(data, {
			get : (target, name) =>
			{
				let result = target[name];
				if (typeof result === 'function')
				{
					if (functions.includes(name))
					{
						result = result.bind(target);
					}
					return result;
				}
				let indexNumber;
				try
				{
					indexNumber = parseFloat(name);
				}
				catch (error)
				{
					return target.get(name);
				}
				if (indexNumber == null || Number.isNaN(indexNumber))
				{
					return target.get(name);
				}
				if (!target.has(name))
				{
					target.set(name, FloatKeyDictionary.Create());
				}
				return target.get(name);
			},
			set : (target, name, value) =>
			{
				target.set(name, value);
				return true;
			}
		});
	}

	/**
	 * @param objData key必须为number类型
	 * @returns {*|void}
	 */
	static CreateWithData(objData)
	{
		if (objData == null)
			return;
		const create = (inputData, inputResult) =>
		{
			if (inputData != null)
			{
				if (typeof inputData === 'object')
				{
					if (inputResult == null)
						inputResult = this.Create();
					const keys = Object.keys(inputData);
					for (let i = 0; i < keys.length; i ++)
					{
						const k = keys[i];
						if (isNaN(parseFloat(k)))
						{
							throw new Error(`key -> ${k}不为number类型。`);
						}
						const v = inputData[k];
						inputResult[k] = create(v, inputResult[k]);
					}
					return inputResult;
				}
				return inputData;
			}
		};
		return create(objData, null);
	}

	/**
	 * 向上获取，包含等于
	 * @param keyNumber
	 * @returns {*}
	 */
	getCloseKeyUp(keyNumber)
	{
		return this.getCloseKey(keyNumber, 'up');
	}

	/**
	 * 向下获取，包含等于
	 * @param keyNumber
	 * @returns {*}
	 */
	getCloseKeyDown(keyNumber)
	{
		return this.getCloseKey(keyNumber, 'down');
	}

	/**
	 * 获取接近项
	 * @param keyNumber
	 * @param upOrDown
	 * @returns {*}
	 */
	getCloseKey(keyNumber, upOrDown)
	{
		if (this.has(keyNumber))
			return this.get(keyNumber);
		let allKeys = Array.from(this.keys());
		let key;
		if (upOrDown === 'up')
		{
			allKeys = allKeys.sort((lv, rv) =>
			                       {
				                       return lv - rv;
			                       });
			key = allKeys.find(v =>
			{
				return v >= keyNumber;
			});
		}
		else if (upOrDown === 'down')
		{
			allKeys = allKeys.sort((lv, rv) =>
			                       {
				                       return rv - lv;
			                       });
			key = allKeys.find(v =>
			{
				return v <= keyNumber;
			});
		}
		if (key === undefined)
			key = allKeys[allKeys.length - 1];
		return this.get(key);
	}
}
module.exports = FloatKeyDictionary;